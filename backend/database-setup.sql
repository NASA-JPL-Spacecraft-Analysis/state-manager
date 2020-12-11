CREATE TABLE `collections` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `name` varchar(45) DEFAULT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `event_history` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `eventId` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `displayName` text,
  `description` text,
  `externalLink` text,
  `editable` tinyint(4) NOT NULL DEFAULT '1',
  `updated` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `events` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `collectionId` varchar(36) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `displayName` text,
  `description` text,
  `externalLink` text,
  `editable` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `information_types` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `collectionId` varchar(36) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `identifier` varchar(45) NOT NULL,
  `displayName` text,
  `description` text,
  `externalLink` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `relationship_history` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `collectionId` varchar(36) NOT NULL,
  `relationshipId` varchar(36) NOT NULL,
  `displayName` text NOT NULL,
  `description` text,
  `subjectType` int(11) NOT NULL,
  `targetType` int(11) NOT NULL,
  `subjectTypeId` varchar(36) NOT NULL,
  `targetTypeId` varchar(36) NOT NULL,
  `updated` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `relationships` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `collectionId` varchar(36) NOT NULL,
  `displayName` text NOT NULL,
  `description` text,
  `subjectType` int(11) NOT NULL,
  `targetType` int(11) NOT NULL,
  `subjectTypeId` varchar(36) NOT NULL,
  `targetTypeId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `state_enumerations` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `collectionId` varchar(36) NOT NULL,
  `stateId` varchar(36) NOT NULL,
  `label` text,
  `value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `state_history` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `collectionId` varchar(36) NOT NULL,
  `stateId` varchar(36) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `displayName` text,
  `type` text,
  `units` text,
  `source` text,
  `subsystem` text,
  `description` text,
  `updated` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `states` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `collectionId` varchar(36) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `displayName` text,
  `type` text,
  `units` text,
  `source` text,
  `subsystem` text,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TRIGGER IF EXISTS `state-manager`.`collections_BEFORE_INSERT`;
DELIMITER $$
USE `state-manager`$$
CREATE DEFINER = CURRENT_USER TRIGGER `state-manager`.`collections_BEFORE_INSERT` BEFORE INSERT ON `collections` FOR EACH ROW
BEGIN
	set new.id = uuid();
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `state-manager`.`event_history_BEFORE_INSERT`;
DELIMITER $$
USE `state-manager`$$
CREATE DEFINER = CURRENT_USER TRIGGER `state-manager`.`event_history_BEFORE_INSERT` BEFORE INSERT ON `event_history` FOR EACH ROW
BEGIN
	set new.id = uuid();
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `state-manager`.`events_BEFORE_INSERT`;
DELIMITER $$
USE `state-manager`$$
CREATE DEFINER = CURRENT_USER TRIGGER `state-manager`.`events_BEFORE_INSERT` BEFORE INSERT ON `events` FOR EACH ROW
BEGIN
	set new.id = uuid();
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `state-manager`.`information_types_BEFORE_INSERT`;
DELIMITER $$
USE `state-manager`$$
CREATE DEFINER = CURRENT_USER TRIGGER `state-manager`.`information_types_BEFORE_INSERT` BEFORE INSERT ON `information_types` FOR EACH ROW
BEGIN
	set new.id = uuid();
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `state-manager`.`relationship_history_BEFORE_INSERT`;
DELIMITER $$
USE `state-manager`$$
CREATE DEFINER = CURRENT_USER TRIGGER `state-manager`.`relationship_history_BEFORE_INSERT` BEFORE INSERT ON `relationship_history` FOR EACH ROW
BEGIN
	set new.id = uuid();
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `state-manager`.`relationships_BEFORE_INSERT`;
DELIMITER $$
USE `state-manager`$$
CREATE DEFINER = CURRENT_USER TRIGGER `state-manager`.`relationships_BEFORE_INSERT` BEFORE INSERT ON `relationships` FOR EACH ROW
BEGIN
	set new.id = uuid();
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `state-manager`.`state_enumerations_BEFORE_INSERT`;
DELIMITER $$
USE `state-manager`$$
CREATE DEFINER = CURRENT_USER TRIGGER `state-manager`.`state_enumerations_BEFORE_INSERT` BEFORE INSERT ON `state_enumerations` FOR EACH ROW
BEGIN
	set new.id = uuid();
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `state-manager`.`state_history_BEFORE_INSERT`;
DELIMITER $$
USE `state-manager`$$
CREATE DEFINER = CURRENT_USER TRIGGER `state-manager`.`state_history_BEFORE_INSERT` BEFORE INSERT ON `state_history` FOR EACH ROW
BEGIN
	set new.id = uuid();
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS `state-manager`.`states_BEFORE_INSERT`;
DELIMITER $$
USE `state-manager`$$
CREATE DEFINER = CURRENT_USER TRIGGER `state-manager`.`states_BEFORE_INSERT` BEFORE INSERT ON `states` FOR EACH ROW
BEGIN
	set new.id = uuid();
END$$
DELIMITER ;
