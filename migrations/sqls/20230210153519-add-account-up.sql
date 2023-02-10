create table accounts(
    id bigint not null auto_increment,
    email varchar(255) not null,
    password text not null,
    created_at datetime default current_timestamp,
    updated_at datetime default current_timestamp on update current_timestamp,
    primary key (id),
    unique (id),
    unique index unique_email(email)
);
