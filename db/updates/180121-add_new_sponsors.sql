USE `asec`;

ALTER TABLE `sponsors` ADD COLUMN `year` INT(4) NOT NULL;
ALTER TABLE `sponsors` CHANGE `id` `id` VARCHAR(36) NOT NULL UNIQUE;
UPDATE `sponsors` SET `year` = 2016;

INSERT INTO `sponsors` VALUES
    (UUID(), "Platinum", "ConocoPhillips", "conocophillips.png", "http://www.conocophillips.ca/Pages/default.aspx", 2018),
    (UUID(), "Silver", 'Cenovus Energy', "cenovus.png", "http://www.cenovus.com/", 2018),
    (UUID(), "Bronze", "International Society of Automation", "isacalgary.png", "https://isacalgary.ca/", 2018),
    (UUID(), "Bronze", "SPE Calgary Section", "spe.png", "http://connect.spe.org/calgary/home", 2018),
    (UUID(), "Bronze", "BMO Cenre", "bmo.png", "http://venues.calgarystampede.com/venues/bmo-centre/", 2018),
    (UUID(), "Bronze", "Suncor Energy", "suncor.png", "http://www.suncor.com/", 2018),
    (UUID(), "Bronze", "Shell", "shell.png", "http://www.shell.ca/", 2018),
    (UUID(), "Table", "GeoLOGIC Systems", "geologicsystems.png", "http://www.geologic.com/", 2018),
    (UUID(), "Table", "Crescent Point Energy", "crescentpoint.png", "http://www.crescentpointenergy.com/", 2018),
    (UUID(), "Table", "Haskayne School of Business", "haskayne.png", "https://haskayne.ucalgary.ca/", 2018),
    (UUID(), "Table", "Simply Elegant", "simplyelegant.png", "https://simplyelegantcorp.com/", 2018),
    (UUID(), "Table", "TransCanada", "transcanada.png", "https://www.transcanada.com/en/", 2018);
