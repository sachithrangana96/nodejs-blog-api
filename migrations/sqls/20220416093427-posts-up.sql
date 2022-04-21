/* Replace with your SQL commands */

CREATE TABLE posts(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    status ENUM('ACTIVE', 'CANCELLED','ONGOING'),
    created_at INT NULL DEFAULT NULL,
    updated_at INT NULL DEFAULT NULL,
    PRIMARY KEY(id),
    INDEX posts_master_1(id ASC),
    CONSTRAINT fk_users_1
    FOREIGN KEY (category_id)
    REFERENCES category (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_users_2
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;