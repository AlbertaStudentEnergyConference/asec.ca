USE `asec`;

CREATE TABLE `sponsors` (
    id VARCHAR(16) UNIQUE NOT NULL,
    level ENUM("platinum", "gold", "silver", "bronze", "table") NOT NULL,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)

INSERT INTO `sponsors`
    (UUID(), "platinum", "ConocoPhillips", "conocophillips.png"),
    (UUID(), "bronze", "International Society of Automation", "isa.png"),
    (UUID(), "table", "Crescent Point Energy", "crescentpoint.png"),
    (UUID(), "table", "geoLOGIC Systems", "geologicsystems.png"),
    (UUID(), "silver", "JuneWarren Nickle's Energy Group", "jwn.png"),
    (UUID(), "silver", "CanOils", "canoils.png");
