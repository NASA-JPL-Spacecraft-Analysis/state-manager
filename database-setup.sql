/* Tables */
CREATE TABLE `collections` (
  `id` varchar(36) NOT NULL,
  `name` varchar(45) NOT NULL,
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

CREATE TABLE `flight_rule_history` (
  `id` varchar(36) NOT NULL,
  `collectionId` varchar(36) DEFAULT NULL,
  `identifier` varchar(255) NOT NULL,
  `displayName` text,
  `description` text,
  `externalLink` text,
  `stage` int(11) NOT NULL,
  `flightRuleId` varchar(36) NOT NULL,
  `updated` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `flight_rules` (
  `id` varchar(36) NOT NULL,
  `collectionId` varchar(36) DEFAULT NULL,
  `identifier` varchar(255) NOT NULL,
  `displayName` text,
  `description` text,
  `externalLink` text,
  `stage` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `group_mapping` (
  `id` varchar(36) NOT NULL,
  `groupId` varchar(36) NOT NULL,
  `itemId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `groups` (
  `id` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `name` varchar(45) NOT NULL,
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

/* Triggers */
CREATE DEFINER=`state-management-db-user`@`%` TRIGGER `state-manager`.`collections_BEFORE_INSERT` BEFORE INSERT ON `collections` FOR EACH ROW
BEGIN
	set new.id = uuid();
END

CREATE DEFINER=`state-management-db-user`@`%` TRIGGER `state-manager`.`event_history_BEFORE_INSERT` BEFORE INSERT ON `event_history` FOR EACH ROW
BEGIN
	set new.id = uuid();
END

CREATE DEFINER=`state-management-db-user`@`%` TRIGGER `state-manager`.`events_BEFORE_INSERT` BEFORE INSERT ON `events` FOR EACH ROW
BEGIN
	set new.id = uuid();
END

CREATE DEFINER=`state-management-db-user`@`%` TRIGGER `state-manager`.`flight_rule_history_BEFORE_INSERT` BEFORE INSERT ON `flight_rule_history` FOR EACH ROW
BEGIN
	set new.id = uuid();
END

CREATE DEFINER=`state-management-db-user`@`%` TRIGGER `state-manager`.`flight_rules_BEFORE_INSERT` BEFORE INSERT ON `flight_rules` FOR EACH ROW
BEGIN
	set new.id = uuid();
END

CREATE DEFINER=`state-management-db-user`@`%` TRIGGER `state-manager`.`information_types_BEFORE_INSERT` BEFORE INSERT ON `information_types` FOR EACH ROW
BEGIN
	set new.id = uuid();
END

CREATE DEFINER=`state-management-db-user`@`%` TRIGGER `state-manager`.`relationship_history_BEFORE_INSERT` BEFORE INSERT ON `relationship_history` FOR EACH ROW
BEGIN
	set new.id = uuid();
END

CREATE DEFINER=`state-management-db-user`@`%` TRIGGER `state-manager`.`relationships_BEFORE_INSERT` BEFORE INSERT ON `relationships` FOR EACH ROW
BEGIN
	set new.id = uuid();
END

CREATE DEFINER=`state-management-db-user`@`%` TRIGGER `state-manager`.`state_enumerations_BEFORE_INSERT` BEFORE INSERT ON `state_enumerations` FOR EACH ROW
BEGIN
	set new.id = uuid();
END

CREATE DEFINER=`state-management-db-user`@`%` TRIGGER `state-manager`.`state_history_BEFORE_INSERT` BEFORE INSERT ON `state_history` FOR EACH ROW
BEGIN
	set new.id = uuid();
END

CREATE DEFINER=`state-management-db-user`@`%` TRIGGER `state-manager`.`states_BEFORE_INSERT` BEFORE INSERT ON `states` FOR EACH ROW
BEGIN
	set new.id = uuid();
END

