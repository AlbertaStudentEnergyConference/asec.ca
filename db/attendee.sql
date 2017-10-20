USE `asec`;

CREATE TABLE attendee (
    id VARCHAR(16) NOT NULL, -- the industry or student id
    type ENUM('student', 'industry') NOT NULL,
    year INT NOT NULL,
    payed INT NOT NULL
);
