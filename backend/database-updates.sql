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

