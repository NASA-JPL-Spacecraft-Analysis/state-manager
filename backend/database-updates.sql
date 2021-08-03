CREATE TABLE `command_arguments` (
  `collectionId` varchar(36) NOT NULL,
  `commandId` varchar(36) NOT NULL,
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `sortOrder` int,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `command_arguments_history` (
  `collectionId` varchar(36) NOT NULL,
  `commandArgumentId` varchar(36) NOT NULL,
  `commandId` varchar(36) NOT NULL,
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `sortOrder` int(11),
  `updated` timestamp NOT NULL,
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

ALTER TABLE `state-manager`.`event_history`
ADD COLUMN `type` TEXT NOT NULL AFTER `editable`;

ALTER TABLE `state-manager`.`events`
ADD COLUMN `type` TEXT NOT NULL AFTER `editable`;

ALTER TABLE `state-manager`.`information_types` 
ADD COLUMN `editable` TINYINT(4) NOT NULL DEFAULT '1' AFTER `externalLink`;

ALTER TABLE `state-manager`.`state_history` 
CHANGE COLUMN `type` `dataType` TEXT NULL DEFAULT NULL ;

ALTER TABLE `state-manager`.`state_history`
ADD COLUMN `editable` TINYINT(4) NOT NULL DEFAULT '1' AFTER `description`;

ALTER TABLE `state-manager`.`state_history`
ADD COLUMN `externalLink` TEXT NULL DEFAULT NULL AFTER `editable`;

ALTER TABLE `state-manager`.`state_history`
ADD COLUMN `type` TEXT NOT NULL AFTER `externalLink`;

ALTER TABLE `state-manager`.`states`
CHANGE COLUMN `type` `dataType` TEXT NULL DEFAULT NULL ;

ALTER TABLE `state-manager`.`states`
ADD COLUMN `editable` TINYINT(4) NOT NULL DEFAULT '1' AFTER `description`;

ALTER TABLE `state-manager`.`states`
ADD COLUMN `externalLink` TEXT NULL DEFAULT NULL AFTER `editable`;

ALTER TABLE `state-manager`.`states`
ADD COLUMN `type` TEXT NOT NULL AFTER `externalLink`;

ALTER TABLE `state-manager`.`relationship-history`
CHANGE `subjectType` `subjectType` text NOT NULL;

ALTER TABLE `state-manager`.`relationship-history`
CHANGE `targetType` `targetType` text NOT NULL;

ALTER TABLE `state-manager`.`relationships`
CHANGE `subjectType` `subjectType` text NOT NULL;

ALTER TABLE `state-manager`.`relationships`
CHANGE `targetType` `targetType` text NOT NULL;

ALTER TABLE `state-manager`.`information_types`
CHANGE `text` `text` text NOT NULL;

update relationships set
subjectType = 'informationType'
where subjectType in (0, 1, 2, 3, 4);

update relationships set
subjectType = 'event'
where subjectType = 5;

update relationships set
subjectType = 'state'
where subjectType = 6;

update relationships set
targetType = 'informationType'
where targetType in (0, 1, 2, 3, 4);

update relationships set
targetType = 'event'
where targetType = 5;

update relationships set
targetType = 'state'
where targetType = 6;

