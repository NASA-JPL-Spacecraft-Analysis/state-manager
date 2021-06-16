CREATE TABLE `collections` (
  `id` varchar(36) NOT NULL,
  `name` varchar(45) NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `command_history` (
  `id` varchar(36) NOT NULL,
  `commandId` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `description` text,
  `displayName` text,
  `externalLink` text,
  `editable` boolean NOT NULL,
  `identifier` text NOT NULL,
  `type` text NOT NULL,
  `updated` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `commands` (
  `id` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `description` text,
  `displayName` text,
  `externalLink` text,
  `editable` boolean NOT NULL,
  `identifier` text NOT NULL,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `constraint_history` (
  `id` varchar(36) NOT NULL,
  `constraintId` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `description` text,
  `displayName` text,
  `externalLink` text,
  `editable` boolean NOT NULL,
  `identifier` text NOT NULL,
  `type` text NOT NULL,
  `updated` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `constraints` (
  `id` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `description` text,
  `displayName` text,
  `externalLink` text,
  `editable` boolean NOT NULL,
  `identifier` text NOT NULL,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `event_history` (
  `id` varchar(36) NOT NULL,
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
  `id` varchar(36) NOT NULL,
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
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `information_types` (
  `id` varchar(36) NOT NULL,
  `collectionId` varchar(36) DEFAULT NULL,
  `identifier` varchar(45) NOT NULL,
  `displayName` text,
  `description` text,
  `externalLink` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `relationship_history` (
  `id` varchar(36) NOT NULL,
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
  `id` varchar(36) NOT NULL,
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
  `id` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `stateId` varchar(36) NOT NULL,
  `label` text,
  `value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `state_history` (
  `id` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `stateId` varchar(36) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `displayName` text,
  `dataType` text,
  `units` text,
  `source` text,
  `subsystem` text,
  `description` text,
  `updated` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `states` (
  `id` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `displayName` text,
  `dataType` text,
  `units` text,
  `source` text,
  `subsystem` text,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
