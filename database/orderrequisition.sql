-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 08 Mar 2025 pada 15.50
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `orderrequisition`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `additional_documents`
--

CREATE TABLE `additional_documents` (
  `id` int(11) NOT NULL,
  `part_number` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `vin_number` varchar(50) NOT NULL,
  `engine_number` varchar(50) NOT NULL,
  `unit_type` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `additional_documents`
--

INSERT INTO `additional_documents` (`id`, `part_number`, `description`, `vin_number`, `engine_number`, `unit_type`, `quantity`, `created_at`) VALUES
(1, 'PN-12312', 'Deskripsi', 'VN-82131', 'EN-123123', 'Motor', 32, '2025-03-08 05:22:36'),
(2, 'PN-21312', 'Desct', 'VN-12312', 'EN-89092', 'Unit Rumah', 123, '2025-03-08 06:02:04'),
(3, 'PN-0021', 'Desctioasda', 'VN-123123', 'EN-748312', 'Mobil', 1211, '2025-03-08 07:19:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `alternative_part_numbers`
--

CREATE TABLE `alternative_part_numbers` (
  `id` int(11) NOT NULL,
  `check_result_item_id` varchar(100) NOT NULL,
  `alternative_part_number` varchar(100) NOT NULL,
  `alternative_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `check_results`
--

CREATE TABLE `check_results` (
  `id` int(11) NOT NULL,
  `form_number` varchar(50) NOT NULL,
  `check_result_item_id` varchar(100) NOT NULL,
  `submit_date` date NOT NULL,
  `result_date` date DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') NOT NULL,
  `part_number` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_point` varchar(100) NOT NULL,
  `end_customer` varchar(255) NOT NULL,
  `inventory_status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`inventory_status`)),
  `alternative_parts` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `check_results`
--

INSERT INTO `check_results` (`id`, `form_number`, `check_result_item_id`, `submit_date`, `result_date`, `status`, `part_number`, `description`, `quantity`, `order_point`, `end_customer`, `inventory_status`, `alternative_parts`) VALUES
(3, '07032025-001-1741319761', '07032025-001-1741319761-1', '2025-03-07', '2025-03-07', '', 'FDCZ16149200104', 'H', 4001210, 'Kendari', 'PT. Andalan Jaya Gemilang', NULL, NULL),
(4, '07032025-001-1741319761', '07032025-001-1741319761-2', '2025-03-07', '2025-03-07', '', 'DCZ161925008', 'E', 455555, 'Angsana', 'PT. Bumi Makmur Bersama', NULL, NULL),
(5, '07032025-001-1741320275', '07032025-001-1741320275-1', '2025-03-07', '2025-03-07', '', 'BS2JSD200T-70700B', 'AJ', 45000, 'Bandung', 'PT. Bumi Makmur Bersama', NULL, NULL),
(6, '07032025-001-1741320275', '07032025-001-1741320275-2', '2025-03-07', '2025-03-07', '', 'BYBLSZ99000894L-WX', 'P', 6000, 'Angsana', 'PT. Bintang Energi Nusantara Damai', NULL, NULL),
(7, '07032025-001-1741332346', '07032025-001-1741332346-1', '2025-03-07', '2025-03-07', '', 'FDCZ16149200104', 'H', 2, 'Angsana', 'PT. Bumi Makmur Bersama', NULL, NULL),
(8, '07032025-001-1741332906', '07032025-001-1741332906-1', '2025-03-07', NULL, 'Pending', 'BS2JSD60T-70740-2', 'AI', 3, 'Bandung', 'PT. Bintang Energi Nusantara Damai', NULL, NULL),
(9, '07032025-001-1741332991', '07032025-001-1741332991-1', '2025-03-07', '2025-03-07', '', 'FDCZ16159200090', 'I', 2, 'Angsana', 'PT. Bumi Sentosa Harmoni', NULL, NULL),
(10, '07032025-001-1741335687', '07032025-001-1741335687-1', '2025-03-07', NULL, 'Pending', 'BYBLSZ99000894L-WX', 'P', 3, 'Angsana', 'PT. Anugerah Teknologi Kreatif', NULL, NULL),
(11, '07032025-001-1741335810', '07032025-001-1741335810-1', '2025-03-07', NULL, 'Pending', 'BS2JSD6T-774-2', 'AS', 1, 'Bandung', 'PT. Arjuna Raya Indonesia', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `customer` text DEFAULT NULL,
  `nama` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`customer`, `nama`) VALUES
('AJG', 'PT. Andalan Jaya Gemilang'),
('ANB', 'PT. Anugerah Nusantara Bersatu'),
('ARI', 'PT. Arjuna Raya Indonesia'),
('ATK', 'PT. Anugerah Teknologi Kreatif'),
('BEND', 'PT. Bintang Energi Nusantara Damai'),
('BKS', 'PT. Berkah Karya Sejahtera'),
('BMB', 'PT. Bumi Makmur Bersama'),
('BMS', 'PT. Berkat Mandiri Sejahtera'),
('BSH', 'PT. Bumi Sentosa Harmoni');

-- --------------------------------------------------------

--
-- Struktur dari tabel `datapn`
--

CREATE TABLE `datapn` (
  `code` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `english_name` text DEFAULT NULL,
  `specification` text DEFAULT NULL,
  `buom` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `datapn`
--

INSERT INTO `datapn` (`code`, `name`, `english_name`, `specification`, `buom`) VALUES
('BY612600000', '', 'A', '', 'Pcs'),
('BY6126001060', '', 'B', '', 'Pcs'),
('BY61260010629', '', 'C', '', 'Pcs'),
('49742X', '', 'D', '', 'Pcs'),
('DCZ161925008', '', 'E', '', 'Pcs'),
('DZ124177091', '', 'F', '', 'Pcs'),
('DZ1241770912', '', 'G', '', 'Pcs'),
('FDCZ16149200104', '', 'H', '', 'Pcs'),
('FDCZ16159200090', '', 'I', '', 'Pcs'),
('FDCZ16159200080', '', 'J', '', 'Pcs'),
('DZ925952022', '', 'K', '', 'Pcs'),
('DZ98955069', '', 'L', '', 'Pcs'),
('DZ98955069', '', 'M', '', 'Pcs'),
('DZ98955069', '', 'N', '', 'Pcs'),
('8.06225.6008', '', 'O', '', 'Pcs'),
('BYBLSZ99000894L-WX', '', 'P', '', 'Pcs'),
('DZ9852602', '', 'Q', '', 'Pcs'),
('8.2640.60', '', 'R', '', 'Pcs'),
('DZ9525952080', '', 'S', '', 'Pcs'),
('DZ95259520805', '', 'T', '', 'Pcs'),
('5594275X', '', 'U', '', 'Pcs'),
('BSF99660', '', 'V', '', 'Pcs'),
('BS4', '', 'W', '', 'Pcs'),
('4022497X', '', 'X', '', 'Pcs'),
('0690X', '', 'Y', '', 'Pcs'),
('8.06225.6008', '', 'Z', '', 'Pcs'),
('SZ99000894-WX', '', 'AA', '', 'Pcs'),
('DZ9625920420', '', 'AB', '', 'Pcs'),
('DZ9259520505', '', 'AC', '', 'Pcs'),
('8.442.0009', '', 'AD', '', 'Pcs'),
('06.2499.055', '', 'AF', '', 'Pcs'),
('880004007', '', 'AE', '', 'Pcs'),
('990452092', '', 'AG', '', 'Pcs'),
('994520042', '', 'AH', '', 'Pcs'),
('BS2JSD60T-70740-2', '', 'AI', '', 'Pcs'),
('BS2JSD200T-70700B', '', 'AJ', '', 'Pcs'),
('BS2JSD200T-70706', '', 'AK', '', 'Pcs'),
('DZ248450', '', 'AL', '', 'Pcs'),
('DZ4257000-5', '', 'AM', '', 'Pcs'),
('DZ42584078', '', 'AN', '', 'Pcs'),
('6.324.55', '', 'AO', '', 'Pcs'),
('88347', '', 'AP', '', 'Pcs'),
('4522', '', 'AQ', '', 'Pcs'),
('45242', '', 'AR', '', 'Pcs'),
('BS2JSD6T-774-2', '', 'AS', '', 'Pcs'),
('BS2JSD2T-773B', '', 'AT', '', 'Pcs'),
('BS2JSD2T-776', '', 'AU', '', 'Pcs'),
('DZ32484533', '', 'AV', '', 'Pcs'),
('DZ42573-5', '', 'AW', '', 'Pcs'),
('DZ4258478', '', 'AX', '', 'Pcs');

-- --------------------------------------------------------

--
-- Struktur dari tabel `etachina`
--

CREATE TABLE `etachina` (
  `id` int(11) NOT NULL,
  `part_number` varchar(50) NOT NULL,
  `eta` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `etachina`
--

INSERT INTO `etachina` (`id`, `part_number`, `eta`) VALUES
(1, 'PN-005', '2025-04-01');

-- --------------------------------------------------------

--
-- Struktur dari tabel `forms`
--

CREATE TABLE `forms` (
  `form_number` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `submit_date` datetime NOT NULL,
  `result_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `forms`
--

INSERT INTO `forms` (`form_number`, `username`, `submit_date`, `result_date`) VALUES
('06032025-001-1741234483', 'admin', '2025-03-06 11:14:43', NULL),
('06032025-001-1741234850', 'admin', '2025-03-06 11:20:50', NULL),
('07032025-001-1741306105', 'admin', '2025-03-07 07:08:25', NULL),
('07032025-001-1741316644', 'admin', '2025-03-07 10:04:04', NULL),
('07032025-001-1741317491', 'admin', '2025-03-07 10:18:11', NULL),
('07032025-001-1741318921', 'admin', '2025-03-07 10:42:01', NULL),
('07032025-001-1741319761', 'admin', '2025-03-07 10:56:01', NULL),
('07032025-001-1741320275', 'admin', '2025-03-07 11:04:35', NULL),
('07032025-001-1741332346', 'admin', '2025-03-07 14:25:46', NULL),
('07032025-001-1741332906', 'admin', '2025-03-07 14:35:06', NULL),
('07032025-001-1741332991', 'admin', '2025-03-07 14:36:31', NULL),
('07032025-001-1741335687', 'admin', '2025-03-07 15:21:27', NULL),
('07032025-001-1741335810', 'admin', '2025-03-07 15:23:30', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `form_items`
--

CREATE TABLE `form_items` (
  `id` int(11) NOT NULL,
  `form_number` varchar(50) NOT NULL,
  `check_result_item_id` varchar(50) NOT NULL,
  `end_customer` varchar(255) NOT NULL,
  `order_point` varchar(100) NOT NULL,
  `part_number` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `result_date` datetime DEFAULT NULL,
  `inventory_status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`inventory_status`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `form_items`
--

INSERT INTO `form_items` (`id`, `form_number`, `check_result_item_id`, `end_customer`, `order_point`, `part_number`, `description`, `quantity`, `result_date`, `inventory_status`) VALUES
(12, '07032025-001-1741319761', '07032025-001-1741319761-1', 'PT. Andalan Jaya Gemilang', 'Kendari', 'FDCZ16149200104', 'H', 4001210, '2025-03-07 10:56:01', '{\"Angsana\": \"Not Available\", \"Bandung\": \"Not Available\", \"Kendari\": \"Not Available\", \"Jakarta\": \"Not Available\"}'),
(13, '07032025-001-1741319761', '07032025-001-1741319761-2', 'PT. Bumi Makmur Bersama', 'Angsana', 'DCZ161925008', 'E', 455555, '2025-03-07 10:56:01', '{\"Angsana\": \"Not Available\", \"Bandung\": \"Not Available\", \"Kendari\": \"Not Available\", \"Jakarta\": \"Not Available\"}'),
(14, '07032025-001-1741320275', '07032025-001-1741320275-1', 'PT. Bumi Makmur Bersama', 'Bandung', 'BS2JSD200T-70700B', 'AJ', 45000, '2025-03-07 11:04:35', '{\"Angsana\": \"Not Available\", \"Bandung\": \"Not Available\", \"Kendari\": \"Not Available\", \"Jakarta\": \"Not Available\"}'),
(15, '07032025-001-1741320275', '07032025-001-1741320275-2', 'PT. Bintang Energi Nusantara Damai', 'Angsana', 'BYBLSZ99000894L-WX', 'P', 6000, '2025-03-07 11:04:35', '{\"Angsana\": \"Not Available\", \"Bandung\": \"Not Available\", \"Kendari\": \"Not Available\", \"Jakarta\": \"Not Available\"}'),
(16, '07032025-001-1741332346', '07032025-001-1741332346-1', 'PT. Bumi Makmur Bersama', 'Angsana', 'FDCZ16149200104', 'H', 2, '2025-03-07 14:25:46', '{\"status\": \"Not Available\", \"description\": \"H\"}'),
(17, '07032025-001-1741332906', '07032025-001-1741332906-1', 'PT. Bintang Energi Nusantara Damai', 'Bandung', 'BS2JSD60T-70740-2', 'AI', 3, NULL, '{\"order_point\": \"Bandung\", \"description\": \"AI\"}'),
(18, '07032025-001-1741332991', '07032025-001-1741332991-1', 'PT. Bumi Sentosa Harmoni', 'Angsana', 'FDCZ16159200090', 'I', 2, '2025-03-07 14:36:31', '{\"status\": \"Not Available\", \"description\": \"I\"}'),
(19, '07032025-001-1741335687', '07032025-001-1741335687-1', 'PT. Anugerah Teknologi Kreatif', 'Angsana', 'BYBLSZ99000894L-WX', 'P', 3, NULL, '{\"status\": {\"Angsana\": \"Not Available\", \"Bandung\": \"Not Available\", \"Kendari\": \"Not Available\", \"Jakarta\": \"Not Available\"}, \"description\": \"P\"}'),
(20, '07032025-001-1741335810', '07032025-001-1741335810-1', 'PT. Arjuna Raya Indonesia', 'Bandung', 'BS2JSD6T-774-2', 'AS', 1, NULL, '{\"status\": {\"Angsana\": \"Not Available\", \"Bandung\": \"Not Available\", \"Kendari\": \"Not Available\", \"Jakarta\": \"Not Available\"}, \"description\": \"AS\"}');

-- --------------------------------------------------------

--
-- Struktur dari tabel `inventory_status`
--

CREATE TABLE `inventory_status` (
  `id` int(11) NOT NULL,
  `check_result_item_id` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` enum('Available','Not Available','Pending') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `realtimeinventory`
--

CREATE TABLE `realtimeinventory` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `warehouse_name` varchar(100) NOT NULL,
  `inventory_status` enum('Available','Not Available') NOT NULL,
  `available_qty` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `realtimeinventory`
--

INSERT INTO `realtimeinventory` (`id`, `code`, `warehouse_name`, `inventory_status`, `available_qty`) VALUES
(1, 'PN-001', 'IEL-KS-Angsana', 'Available', 10),
(2, 'PN-002', 'IEL-MU-BDG', 'Not Available', 0),
(3, 'PN-003', 'IEL-ST-KDI', 'Available', 5),
(4, 'PN-004', 'JKT-JAV', 'Available', 20);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transfermonitoring`
--

CREATE TABLE `transfermonitoring` (
  `id` int(11) NOT NULL,
  `part_number` varchar(50) NOT NULL,
  `destination_warehouse` varchar(100) NOT NULL,
  `eta` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transfermonitoring`
--

INSERT INTO `transfermonitoring` (`id`, `part_number`, `destination_warehouse`, `eta`) VALUES
(1, 'PN-002', 'JKT-JAV', '2025-03-10'),
(2, 'PN-003', 'IEL-MU-SFI', '2025-03-15');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `additional_documents`
--
ALTER TABLE `additional_documents`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `alternative_part_numbers`
--
ALTER TABLE `alternative_part_numbers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `check_result_item_id` (`check_result_item_id`);

--
-- Indeks untuk tabel `check_results`
--
ALTER TABLE `check_results`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `check_result_item_id` (`check_result_item_id`);

--
-- Indeks untuk tabel `etachina`
--
ALTER TABLE `etachina`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`form_number`);

--
-- Indeks untuk tabel `form_items`
--
ALTER TABLE `form_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_form_number` (`form_number`),
  ADD KEY `idx_check_result_item_id` (`check_result_item_id`);

--
-- Indeks untuk tabel `inventory_status`
--
ALTER TABLE `inventory_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `check_result_item_id` (`check_result_item_id`);

--
-- Indeks untuk tabel `realtimeinventory`
--
ALTER TABLE `realtimeinventory`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transfermonitoring`
--
ALTER TABLE `transfermonitoring`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `additional_documents`
--
ALTER TABLE `additional_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `alternative_part_numbers`
--
ALTER TABLE `alternative_part_numbers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `check_results`
--
ALTER TABLE `check_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `etachina`
--
ALTER TABLE `etachina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `form_items`
--
ALTER TABLE `form_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `inventory_status`
--
ALTER TABLE `inventory_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `realtimeinventory`
--
ALTER TABLE `realtimeinventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `transfermonitoring`
--
ALTER TABLE `transfermonitoring`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `alternative_part_numbers`
--
ALTER TABLE `alternative_part_numbers`
  ADD CONSTRAINT `alternative_part_numbers_ibfk_1` FOREIGN KEY (`check_result_item_id`) REFERENCES `check_results` (`check_result_item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `form_items`
--
ALTER TABLE `form_items`
  ADD CONSTRAINT `fk_form_number` FOREIGN KEY (`form_number`) REFERENCES `forms` (`form_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `inventory_status`
--
ALTER TABLE `inventory_status`
  ADD CONSTRAINT `inventory_status_ibfk_1` FOREIGN KEY (`check_result_item_id`) REFERENCES `check_results` (`check_result_item_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
