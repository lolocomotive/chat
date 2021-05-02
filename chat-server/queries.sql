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
insert into messages(userid, content)
values(1, 'Henlo fren');