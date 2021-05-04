/*
 * Select all messages + usernames
 */
select content,
    username
from messages
    join users on messages.userid = users.id
order by messages.id asc;
/*
 * Select hash of user
 */
select pwd_hash
from users
where username = 'lolocomotive';
/*
 * Send message
 */
insert into messages(userid, content, date)
values(
        1,
        'Henlo',
        'Sun May 02 2021 15:33:32 GMT+0200 (Central European Summer Time)'
    );