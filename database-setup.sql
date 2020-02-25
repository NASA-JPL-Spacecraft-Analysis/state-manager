CREATE TABLE `state_variables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `units` varchar(45) DEFAULT NULL,
  `source` varchar(45) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identifier_UNIQUE` (`identifier`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `state_enumerations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state_variable_id` int(11) NOT NULL,
  `enum_value` varchar(45) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `state_variable_id` FOREIGN KEY (`id`) REFERENCES `state_variables` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `relationships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `display_name` varchar(45) NOT NULL,
  `description` text,
  `subject_state_id` int(11) NOT NULL,
  `target_state_id` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

