CREATE DATABASE  IF NOT EXISTS `state-management-db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `state-management-db`;
CREATE TABLE `collections` (
  `id` varchar(36) NOT NULL,
  `name` varchar(45) NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `command_argument_history` (
  `collectionId` varchar(36) NOT NULL,
  `commandArgumentId` varchar(36) NOT NULL,
  `commandId` varchar(36) NOT NULL,
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `sortOrder` int(11) DEFAULT NULL,
  `updated` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `command_arguments` (
  `collectionId` varchar(36) NOT NULL,
  `commandId` varchar(36) NOT NULL,
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `sortOrder` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `command_argument_enumerations` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `collectionId` varchar(36) NOT NULL,
  `commandId` varchar(36) NOT NULL,
  `label` text,
  `value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `command_history` (
  `id` varchar(36) NOT NULL,
  `commandId` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `description` text,
  `displayName` text NOT NULL,
  `externalLink` text,
  `editable` tinyint(1) NOT NULL,
  `identifier` text NOT NULL,
  `type` text NOT NULL,
  `updated` timestamp NOT NULL,
  `version` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `commands` (
  `id` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `description` text,
  `displayName` text NOT NULL,
  `externalLink` text,
  `editable` tinyint(1) NOT NULL,
  `identifier` text NOT NULL,
  `type` text NOT NULL,
  `version` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `constraint_history` (
  `id` varchar(36) NOT NULL,
  `constraintId` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `description` text,
  `displayName` text,
  `externalLink` text,
  `editable` tinyint(1) NOT NULL,
  `identifier` text NOT NULL,
  `type` text NOT NULL,
  `updated` timestamp NOT NULL,
  `version` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `constraints` (
  `id` varchar(36) NOT NULL,
  `collectionId` varchar(36) NOT NULL,
  `description` text,
  `displayName` text NOT NULL,
  `externalLink` text,
  `editable` tinyint(1) NOT NULL,
  `identifier` text NOT NULL,
  `type` text NOT NULL,
  `version` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `data_types` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `name` text NOT NULL,
  `type` text NOT NULL,
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
  `type` text NOT NULL,
  `updated` timestamp NOT NULL,
  `version` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `events` (
  `id` varchar(36) NOT NULL DEFAULT '',
  `collectionId` varchar(36) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `displayName` text,
  `description` text,
  `externalLink` text,
  `editable` tinyint(4) NOT NULL DEFAULT '1',
  `type` text NOT NULL,
  `version` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `group_mapping` (
  `id` varchar(36) NOT NULL,
  `groupId` varchar(36) NOT NULL,
  `itemId` varchar(36) NOT NULL,
  `sortOrder` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `groups` (
  `id` varchar(36) NOT NULL,
  `collectionId` text NOT NULL,
  `description` text,
  `enabled` tinyint(4) NOT NULL DEFAULT '1',
  `identifier` text NOT NULL,
  `lastModified` timestamp NOT NULL,
  `source` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `information_types` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `collectionId` varchar(36) DEFAULT NULL,
  `type` text NOT NULL,
  `identifier` varchar(45) NOT NULL,
  `displayName` text,
  `description` text,
  `externalLink` text,
  `editable` tinyint(4) NOT NULL DEFAULT '1',
  `version` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `relationship_history` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `collectionId` varchar(36) NOT NULL,
  `relationshipId` varchar(36) NOT NULL,
  `displayName` text NOT NULL,
  `subjectToTargetDescription` text,
  `subjectType` text NOT NULL,
  `targetToSubjectDescription` text,
  `targetType` text NOT NULL,
  `subjectTypeId` varchar(36) NOT NULL,
  `targetTypeId` varchar(36) NOT NULL,
  `updated` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `relationships` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `collectionId` varchar(36) NOT NULL,
  `displayName` text NOT NULL,
  `subjectToTargetDescription` text,
  `subjectType` text NOT NULL,
  `targetToSubjectDescription` text,
  `targetType` text NOT NULL,
  `subjectTypeId` varchar(36) NOT NULL,
  `targetTypeId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `state_enumeration_history` (
  `id` varchar(36) NOT NULL,
  `updated` timestamp NOT NULL,
  `stateEnumerationId` varchar(36) NOT NULL,
  `value` text,
  `label` text,
  `collectionId` varchar(36) NOT NULL,
  `stateId` varchar(36) NOT NULL,
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
  `dataType` text,
  `units` text,
  `source` text,
  `subsystem` text,
  `description` text,
  `editable` tinyint(4) NOT NULL DEFAULT '1',
  `externalLink` text,
  `updated` timestamp NOT NULL,
  `type` text NOT NULL,
  `channelId` text,
  `restricted` tinyint(4) NOT NULL DEFAULT '0',
  `version` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `states` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `channelId` text,
  `collectionId` varchar(36) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `displayName` text,
  `dataType` text,
  `units` text,
  `source` text,
  `subsystem` text,
  `description` text,
  `editable` tinyint(4) NOT NULL DEFAULT '1',
  `externalLink` text,
  `type` text NOT NULL,
  `restricted` tinyint(4) NOT NULL DEFAULT '0',
  `version` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `data_types` (name, type) VALUES
('command','command'),
('alarm_limit','state'),
('channel','state'),
('fsw_parameter','state'),
('model_input','state'),
('predict','state'),
('trend','state'),
('user','state'),
('channel_alarm','constraint'),
('downlink_rule_check','constraint'),
('flight_rule_check','constraint'),
('goal','informationType'),
('model','informationType'),
('activity_instance','event'),
('command_instance','event'),
('evr','event'),
('predicted_event','event'),
('user','event'),
('guideline','constraint'),
('scheduling_constraint','constraint');
