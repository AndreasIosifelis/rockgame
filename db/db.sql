-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.27 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for rockgame
CREATE DATABASE IF NOT EXISTS `rockgame` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `rockgame`;


-- Dumping structure for table rockgame.players
CREATE TABLE IF NOT EXISTS `players` (
  `idc` int(11) NOT NULL AUTO_INCREMENT,
  `playerLevel` varchar(10) NOT NULL DEFAULT '0',
  `playerAvatar` varchar(255) NOT NULL DEFAULT '0',
  `playerName` varchar(255) NOT NULL DEFAULT '0',
  `playerScore` int(11) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL,
  PRIMARY KEY (`idc`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Dumping data for table rockgame.players: ~0 rows (approximately)
DELETE FROM `players`;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` (`idc`, `playerLevel`, `playerAvatar`, `playerName`, `playerScore`, `date`) VALUES
	(8, 'expert', 'http://www.sinelabs.com/static/images/icon_rocket.png', 'Andreas', 112, '2014-07-24 17:19:37'),
	(9, 'medium', 'http://upload.wikimedia.org/wikipedia/en/thumb/6/66/Falcon_9_Flight_1_mission_emblem.png/50px-Falcon_9_Flight_1_mission_emblem.png', 'Zina', 18, '2014-07-24 17:27:14');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
