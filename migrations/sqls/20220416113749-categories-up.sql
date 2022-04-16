/* Replace with your SQL commands */


CREATE TABLE category (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  status ENUM('ACTIVE', 'CANCELLED','ONGOING'),
  created_at INT NULL DEFAULT NULL,
  updated_at INT NULL DEFAULT NULL,
  PRIMARY KEY (id),
  INDEX service_master_1 (id ASC)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;