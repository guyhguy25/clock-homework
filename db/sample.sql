SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mdclone`
--

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Employee','Manager') NOT NULL,
  `managerId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `managerId` (`managerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `TimesheetReports`
--

CREATE TABLE `TimesheetReports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `date` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `status` enum('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`firstName`, `lastName`, `email`, `password`, `role`, `managerId`, `createdAt`, `updatedAt`) VALUES
('John', 'Smith', 'john.smith@company.com', '$2a$10$hashedpassword1', 'Manager', NULL, NOW(), NOW()),
('Sarah', 'Johnson', 'sarah.johnson@company.com', '$2a$10$hashedpassword2', 'Manager', NULL, NOW(), NOW()),
('Michael', 'Williams', 'michael.williams@company.com', '$2a$10$hashedpassword3', 'Employee', 1, NOW(), NOW()),
('Emily', 'Brown', 'emily.brown@company.com', '$2a$10$hashedpassword4', 'Employee', 1, NOW(), NOW()),
('David', 'Jones', 'david.jones@company.com', '$2a$10$hashedpassword5', 'Employee', 2, NOW(), NOW()),
('Jessica', 'Garcia', 'jessica.garcia@company.com', '$2a$10$hashedpassword6', 'Employee', 2, NOW(), NOW());

--
-- Dumping data for table `TimesheetReports`
--

INSERT INTO `TimesheetReports` (`userId`, `date`, `startTime`, `endTime`, `status`, `createdAt`, `updatedAt`) VALUES
(3, '2024-03-18', '09:00:00', '17:00:00', 'Approved', NOW(), NOW()),
(3, '2024-03-19', '09:00:00', '17:00:00', 'Approved', NOW(), NOW()),
(3, '2024-03-20', '09:00:00', '17:00:00', 'Approved', NOW(), NOW()),
(3, '2024-03-21', '09:00:00', '17:00:00', 'Approved', NOW(), NOW()),
(3, '2024-03-22', '09:00:00', '17:00:00', 'Approved', NOW(), NOW()),
(4, '2024-03-18', '09:00:00', '17:00:00', 'Approved', NOW(), NOW()),
(4, '2024-03-19', '09:00:00', '17:00:00', 'Approved', NOW(), NOW()),
(4, '2024-03-20', '09:00:00', '17:00:00', 'Approved', NOW(), NOW()),
(4, '2024-03-21', '09:00:00', '17:00:00', 'Approved', NOW(), NOW()),
(4, '2024-03-22', '09:00:00', '17:00:00', 'Approved', NOW(), NOW());

--
-- Constraints for dumped tables
--

ALTER TABLE `Users`
  ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`managerId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `TimesheetReports`
  ADD CONSTRAINT `TimesheetReports_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;