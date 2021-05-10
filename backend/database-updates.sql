ALTER TABLE `state-manager`.`information_types` 
ADD COLUMN `editable` TINYINT(4) NOT NULL DEFAULT '1' AFTER `externalLink`;

ALTER TABLE `state-manager`.`state_history` 
CHANGE COLUMN `type` `dataType` TEXT NULL DEFAULT NULL ;

ALTER TABLE `state-manager`.`state_history`
ADD COLUMN `editable` TINYINT(4) NOT NULL DEFAULT '1' AFTER `description`;

ALTER TABLE `state-manager`.`state_history`
ADD COLUMN `externalLink` TEXT NULL DEFAULT NULL AFTER `editable`;

ALTER TABLE `state-manager`.`states`
CHANGE COLUMN `type` `dataType` TEXT NULL DEFAULT NULL ;

ALTER TABLE `state-manager`.`states`
ADD COLUMN `editable` TINYINT(4) NOT NULL DEFAULT '1' AFTER `description`;

ALTER TABLE `state-manager`.`states`
ADD COLUMN `externalLink` TEXT NULL DEFAULT NULL AFTER `editable`;

