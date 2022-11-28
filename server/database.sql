CREATE TABLE users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE session (
sid character varying NOT NULL,
sess json NOT NULL,
expire timestamp(6) with time zone NOT NULL
);