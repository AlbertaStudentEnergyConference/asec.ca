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
    (UUID(), "Silver", "CanOils", "canoils.png", "http://www.canoils.com/"),
    (UUID(), "Silver", 'Cenovus Energy', "cenovus.png", "http://www.cenovus.com/"),
    (UUID(), "Silver", "JuneWarren Nickle's Energy Group", "jwn.png", "http://www.jwnenergy.com/"),
    (UUID(), "Bronze", "Canadian Natural Resources", "cnrl.png", "https://www.cnrl.com/"),
    (UUID(), "Bronze", "Enerplus", "enerplus.png", "http://www.enerplus.com/"),
    (UUID(), "Bronze", "SPE Calgary Section", "spe.png", "http://connect.spe.org/calgary/home"),
    (UUID(), "Bronze", "Crescent Point Energy", "crescentpoint.png", "http://www.crescentpointenergy.com/"),
    (UUID(), "Bronze", "Shell", "shell.png", "http://www.shell.ca/"),
    (UUID(), "Bronze", "Simply Elegant", "simplyelegant.png", "https://simplyelegantcorp.com/"),
    (UUID(), "Table", "Energy Navigator", "energynavigator.png", "http://www.energynavigator.com/"),
    (UUID(), "Table", "Schulich School of Engineering", "schulich.png", "http://schulich.ucalgary.ca/"),
    (UUID(), "Table", "ARC Resources", "arc.png", "http://www.arcresources.com/"),
    (UUID(), "Energy Bowl", "EPAC", "epac.png", "http://explorersandproducers.ca/");
