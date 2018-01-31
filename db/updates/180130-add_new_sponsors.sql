USE `asec`;

UPDATE `sponsors` SET image = 'conocophillipscanada.png' WHERE id = 'd6ab3525-ff31-11e7-b48c-72edc1481193';

INSERT INTO `sponsors` VALUES
    (UUID(), "Table", "Canada's Energy Citizens", "canadasenergycitizens.png", "http://www.energycitizens.ca/", 2018),
    (UUID(), "Table", "APEGA", "apega.png", "https://www.apega.ca/", 2016);
