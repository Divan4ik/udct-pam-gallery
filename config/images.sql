CREATE TABLE `images` (
    `id` INT(11) NOT NULL,
    `date_creation` INT(11) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `checksum` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `name` (`name`),
    UNIQUE INDEX `checksum` (`checksum`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;