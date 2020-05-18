CREATE TABLE `information_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `identifier` varchar(45) NOT NULL,
  `display_name` varchar(45) DEFAULT NULL,
  `description` text,
  `external_link` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `relationship_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `relationship_id` int(11) NOT NULL,
  `display_name` text NOT NULL,
  `description` text DEFAULT NULL,
  `subject_type` int(11) NOT NULL,
  `target_type` int(11) NOT NULL,
  `subject_type_id` int(11) NOT NULL,
  `target_type_id` int(11) NOT NULL,
  `updated` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `relationships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `display_name` text NOT NULL,
  `description` text,
  `subject_type` int(11) NOT NULL,
  `target_type` int(11) NOT NULL,
  `subject_type_id` int(11) NOT NULL,
  `target_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `state_enumerations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state_variable_id` int(11) NOT NULL,
  `label` varchar(45) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `state_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state_id` int(11) NOT NULL,
  `identifier` varchar(45) NOT NULL,
  `display_name` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `units` varchar(45) DEFAULT NULL,
  `source` varchar(45) DEFAULT NULL,
  `subsystem` varchar(45) DEFAULT NULL,
  `description` text,
  `updated` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `state_variables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `display_name` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `units` varchar(45) DEFAULT NULL,
  `source` varchar(45) DEFAULT NULL,
  `subsystem` varchar(45) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identifier_UNIQUE` (`identifier`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

