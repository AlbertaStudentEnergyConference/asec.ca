USE `asec`;

CREATE TABLE `sponsors` (
    id VARCHAR(16) UNIQUE NOT NULL,
    level ENUM("platinum", "gold", "silver", "bronze", "table") NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)
