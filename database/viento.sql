CREATE TABLE `anemometro` (
  `fecha` timestamp primary key DEFAULT CURRENT_TIMESTAMP,
  `nudos` float NOT NULL,
  `minima` float NOT NULL,
  `maxima` float NOT NULL,
  `direccion` varchar(10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=COMPACT;
COMMIT;

