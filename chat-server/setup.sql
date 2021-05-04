/* 
 * Create users table
 */
create table users(
    id serial primary key,
    username varchar(64) not null unique,
    pwd_hash char(60)
);
/*
 * Create messages table
 */
create table messages(
    id serial primary key,
    userid int not null,
    content text,
    date char(64),
    constraint userid foreign key(userid) references users(id)
);
/*
 * Create user
 */
create user messages with password 'Passw0rd!';
grant insert,
    select on messages to messages;
grant usage on messages_id_seq to messages;
grant insert,
    select on users to messages;
grant usage on users_id_seq to messages;