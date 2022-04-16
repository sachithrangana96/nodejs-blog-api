/* Replace with your SQL commands */

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    profile VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dob int NOT NULL,
    status ENUM('ACTIVE', 'CANCELLED','ONGOING'),
    created_at INT NULL DEFAULT NULL,
    updated_at INT NULL DEFAULT NULL,
    PRIMARY KEY (id),
    INDEX users_master_1(id ASC)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;