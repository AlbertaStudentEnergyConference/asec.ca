USE `asec`;

CREATE TABLE `industry` (
    id VARCHAR(16) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    diet ENUM('vegetarian', 'vegan', 'pescatarian'),
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)
