import { Http2ServerRequest, Http2ServerResponse } from 'node:http2';
import { Query, QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import { pwd_read } from './db_users/pwd_read';
import { v4 as uuid } from 'uuid';
import { Socket } from 'socket.io';
type SessionData = {
    sessionID: string;
    authorized: boolean;
    username: string;
    userid: number;
};

let users: SessionData[] = [];

var http = require('http');
/*
 *localhost:5000/login
 *|-> Login
 *
 *localhost:5000/messages
 *|-> query all messages
 *
 *etc...
 */
http.createServer(function (req: Http2ServerRequest, res: Http2ServerResponse) {
    res.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*',
    });

    let responseRaw: any[] = [];
    switch (req.url) {
        case '/messages':
            req.on('data', (chunk) => {
                responseRaw.push(chunk);
            }).on('end', async () => {
                var body = Buffer.concat(responseRaw);
                let sessionID = JSON.parse(body.toString()).sessionID;
                let session = getSession(sessionID);
                if (session != undefined) {
                    if (session.authorized) {
                        pwd_read.query(
                            `select content,username,date from messages join users on messages.userid = users.id order by messages.id asc;`,
                            (err: Error, results: QueryResult) => {
                                if (err) throw err;

                                res.end(
                                    JSON.stringify({
                                        status: 'authorized',
                                        messages: results.rows,
                                        username: session.username,
                                    })
                                );
                            }
                        );
                    } else {
                        res.end(
                            JSON.stringify({
                                status: 'unauthorized',
                                username: session.username,
                            })
                        );
                    }
                } else {
                    res.end(
                        JSON.stringify({
                            status: 'disconnected',
                        })
                    );
                }
            });

            break;
        case '/login':
            /*
             *    Handle Login
             */

            req.on('data', (chunk) => {
                responseRaw.push(chunk);
            }).on('end', async () => {
                var body = Buffer.concat(responseRaw);
                let credentials: {
                    username: String;
                    password: String;
                } = JSON.parse(body.toString());
                let response: {
                    status: string;
                    message: string;
                    sessionID: string;
                } = {
                    status: '',
                    message: '',
                    sessionID: '',
                };

                //! If the user exists
                await pwd_read.query(
                    `select pwd_hash,id from users where username='${credentials.username}'`,
                    (err: Error, results: QueryResult) => {
                        if (err) {
                            throw err;
                        }
                        if (results.rowCount > 0) {
                            //! If the password is correct
                            console.log(
                                bcrypt.hashSync(credentials.password, 10)
                            );
                            if (
                                bcrypt.compareSync(
                                    credentials.password,
                                    results.rows[0].pwd_hash
                                )
                            ) {
                                response.status = 'authorized';
                                response.sessionID = uuid();
                                users.push({
                                    sessionID: response.sessionID,
                                    username: credentials.username as string,
                                    authorized: true,
                                    userid: parseInt(results.rows[0].id),
                                });
                            } else {
                                response.status = 'unauthorized';
                                response.message = 'wrongpass';
                            }
                        } else {
                            response.status = 'unauthorized';
                            response.message = 'nouser';
                        }
                        res.end(JSON.stringify(response));
                    }
                );
            });

            break;
        default:
            res.end(JSON.stringify({ message: 'Invalid request URL' }));
    }
}).listen(3000);
console.log('REST API listening on port 3000');

var socketServer = http.createServer();
const io = require('socket.io')(socketServer, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket: Socket) => {
    socket.on(
        'msg',
        async (message: {
            username: string;
            content: string;
            date: string;
            sessionID: string;
        }) => {
            var session = getSession(message.sessionID);
            if (
                session == undefined ||
                session.authorized == undefined ||
                !session.authorized
            ) {
                socket.emit('error', 'unauthorized');
                return;
            }
            var query = `insert into messages(userid, content, date) values(${
                session.userid
            }, '${message.content.replace(/\'/g, "''")}','${message.date}');`;
            await pwd_read.query(query, (err: Error, results: QueryResult) => {
                if (err) throw err;
                io.emit('msg', message);
            });
        }
    );
});
function getSession(sessionID: string): SessionData {
    return users.filter((user) => user.sessionID === sessionID)[0];
}
socketServer.listen(3001);
console.log('Websocket server listening on port 3001');
