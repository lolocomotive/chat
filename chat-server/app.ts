import { Http2ServerRequest, Http2ServerResponse } from 'node:http2';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import { pwd_read } from './db_users/pwd_read';

var http = require('http');
/*
 *localhost:5000/login
 *|-> Login
 *
 *localhost:5000/register
 *|-> Register
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
                console.log(
                    'Identifying user "' +
                        credentials.username +
                        '" using password "' +
                        credentials.password +
                        '"'
                );
                let response: { status: string; message: string } = {
                    status: '',
                    message: '',
                };

                //! If the user exists
                await pwd_read.query(
                    `select * from users where username='${credentials.username}'`,
                    (err: Error, results: QueryResult) => {
                        if (err) {
                            throw err;
                        }
                        if (results.rowCount > 0) {
                            //! If the password is correct
                            if (
                                bcrypt.compareSync(
                                    credentials.password,
                                    results.rows[0].pwd_hash
                                )
                            ) {
                                response.status = 'authorized';
                            } else {
                                response.status = 'unauthorized';
                                response.message = 'Wrong password!';
                            }
                        } else {
                            response.status = 'unauthorized';
                            response.message = 'No such user';
                        }
                        switch (response.status) {
                            case 'authorized':
                                console.log('User has been authorized');
                                break;
                            case 'unauthorized':
                                console.log(
                                    'The access has been denied to the user for reason:',
                                    response.message
                                );
                                break;
                            default:
                                console.log('UNKNOWN STATUS!');
                        }
                        res.end(JSON.stringify(response));
                    }
                );
            });

            break;
        default:
            res.end(JSON.stringify({ message: 'Invalid request URL' }));
    }
}).listen(5000);
console.log('Listening on port 5000');
