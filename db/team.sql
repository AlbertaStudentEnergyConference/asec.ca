USE `asec`;

CREATE TABLE `team` (
    `id` VARCHAR(16) UNIQUE NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `bio` VARCHAR(1000),
    `email` VARCHAR(255),
    `phone` VARCHAR(20),
    `type` ENUM("executive", "director") NOT NULL,
    `parent_id` VARCHAR(16),
    PRIMARY KEY (`id`)
);

INSERT INTO `team` VALUES
    (
        UUID(),
        "Austyn Nagribianko",
        "Co-Chair",
        "I am currently in my third year of Electrical Engineering with a specialization in Energy and Environment at the Schulich School of Engineering. I have a strong passion for understanding the world around us and take pride in the opportunities that I participate in. Following my 2019 graduation, I aspire to continue my career in power systems, power electronics, or analog electronics. I am excited for 2018's ASEC and as Co-Chair alongside Marco Ludovice, I believe that 2018 will see a truly inspiring conference of collaboration and culture for students and industry alike and I look forward to meeting everyone in attendance!",
        "chair@asec.ca",
        "403-785-5135",
        "executive",
        NULL
    ),
    (
        UUID(),
        "Marco Ludovice",
        "Co-Chair",
        NULL,
        "chair@asec.ca",
        "403-826-6955",
        "executive",
        NULL
    ),
    (
        UUID(),
        "Stephanie Happ",
        "Vice President of Logistics",
        "I am currently in my third year Chemical Engineering, specializing in Energy and Environment. After completing my third year, I will be working as an engineering intern with TransCanada Pipelines in their gas storage industry for 16 months. Upon my graduation, I want to pursue a career in the energy industry to work on improving the current energy sector by engineering more efficient technologies and techniques for the exploitation of oil and gas, as well as be a part of the development of new, sustainable alternative energy technologies.",
        "logistics@asec.ca",
        NULL,
        "executive",
        NULL
    ),
    (
        UUID(),
        "Elizabeth McCaffrey",
        "Vice President of Communications and Marketing",
        "I have just finished my third year in Chemical Engineering with a specialization in Energy and the Environment at the University of Calgary. This past summer (2016), I worked as a Relief Operator in southwest Saskatchewan and I will return as a Relief Operator for the same company, Canadian Natural Resources Limited, in Rocky Mountain House this coming summer. After an exciting summer spent exploring Alberta, I will be working in an office environment for 12 months with CNRL before I return for my final year at the Schulich School of Engineering. I am honoured to be an executive on ASEC as I am a passionate and energetic individual who wishes to make a difference in the energy industry.",
        "marketing@asec.ca",
        NULL,
        "executive",
        NULL
    ),
    (
        UUID(),
        "Sam Robertson",
        "Vice President of Energy Bowl",
        NULL,
        "energybowl@asec.ca",
        NULL,
        "executive",
        NULL
    ),
    (
        UUID(),
        "Mitchell Sawatzky",
        "Vice President of Information Technology",
        "I am currently in my third year of Software Engineering at the Schulich School of Engineering in the University of Calgary. I will be working as an engineering intern with Pason Systems after the completion of my third year for 16 months. Following graduation, I am very excited to pursue a career in the software industry, creating new systems that help make the world a better place.",
        "it@asec.ca",
        NULL,
        "executive",
        NULL
    ),
    (
        UUID(),
        "Zack Vogeli",
        "Vice President of Sponsorship",
        NULL,
        "sponsorship@asec.ca",
        NULL,
        "executive",
        NULL
    ),
    (
        UUID(),
        "Ali Charanek",
        "Vice President of Finance",
        NULL,
        "finance@asec.ca",
        NULL,
        "executive",
        NULL
    ),
    (
        UUID(),
        "Amir Greiss",
        "Vice President of Facilities",
        NULL,
        "facilities@asec.ca",
        NULL,
        "executive",
        NULL
    );

INSERT INTO `team` (`id`, `name`, `position`, `type`, `parent_id`) VALUES
    (
        UUID(),
        "Zewei Kurt Tang",
        "Sponsorship Director",
        "director",
        (SELECT `t`.`id` FROM `team` `t` WHERE `t`.`position` LIKE "%Sponsorship")
    ),
    (
        UUID(),
        "Shaamir Haneef",
        "Facilities Director",
        "director",
        (SELECT `t`.`id` FROM `team` `t` WHERE `t`.`position` LIKE "%Facilities")
    ),
    (
        UUID(),
        "Scott Farquharson",
        "Energy Bowl Director",
        "director",
        (SELECT `t`.`id` FROM `team` `t` WHERE `t`.`position` LIKE "%Bowl")
    ),
    (
        UUID(),
        "Benjamin Sterling",
        "Sponsorship Director",
        "director",
        (SELECT `t`.`id` FROM `team` `t` WHERE `t`.`position` LIKE "%Sponsorship")
    ),
    (
        UUID(),
        "Jasmine Lu",
        "Logistics Director",
        "director",
        (SELECT `t`.`id` FROM `team` `t` WHERE `t`.`position` LIKE "%Logistics")
    ),
    (
        UUID(),
        "Osman Molumo",
        "Facilities Director",
        "director",
        (SELECT `t`.`id` FROM `team` `t` WHERE `t`.`position` LIKE "%Facilities")
    );
