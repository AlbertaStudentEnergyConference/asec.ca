USE `asec`;

CREATE TABLE `sponsors` (
    id VARCHAR(16) UNIQUE NOT NULL,
    level ENUM("Platinum", "Gold", "Silver", "Bronze", "Table", "Energy Bowl") NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    link VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO `sponsors` VALUES
    (UUID(), "Platinum", "ConocoPhillips", "conocophillips.png", "http://www.conocophillips.ca/Pages/default.aspx"),
    (UUID(), "Bronze", "International Society of Automation", "isa.png", "https://www.isa.org/"),
    (UUID(), "Table", "Crescent Point Energy", "crescentpoint.png", "http://www.crescentpointenergy.com/"),
    (UUID(), "Table", "geoLOGIC Systems", "geologicsystems.png", "http://www.geologic.com/"),
    (UUID(), "Silver", "JuneWarren Nickle's Energy Group", "jwn.png", "http://www.jwnenergy.com/"),
    (UUID(), "Silver", "CanOils", "canoils.png", "http://www.canoils.com/");
