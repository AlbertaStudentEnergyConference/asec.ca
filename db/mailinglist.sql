CREATE TABLE `mailinglist` (
    id VARCHAR(16) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);
