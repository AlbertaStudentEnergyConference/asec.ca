USE `asec`;

CREATE TABLE `student` (
    id VARCHAR(16) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    school VARCHAR(255) NOT NULL,
    discipline VARCHAR(255) NOT NULL,
    diet ENUM('vegetarian', 'vegan', 'pescatarian'),
    year INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
