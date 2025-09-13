-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: matifrjbd
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `matifrjbd` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `matifrjbd`;

--
-- Table structure for table `alternativas`
--

DROP TABLE IF EXISTS `alternativas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alternativas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `conteudo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0',
  `correta` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=488 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alternativas`
--

LOCK TABLES `alternativas` WRITE;
/*!40000 ALTER TABLE `alternativas` DISABLE KEYS */;
INSERT INTO `alternativas` VALUES (471,'1',0),(472,'2',1),(473,'3',0),(474,'4',0),(475,'5',1),(476,'3',0),(477,'2',0),(478,'1',0),(479,'0',1),(480,'3',0),(481,'2',1),(482,'2',0),(483,'3',0),(484,'1',1),(485,'3',0),(486,'4',0),(487,'1i',1);
/*!40000 ALTER TABLE `alternativas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacoes`
--

DROP TABLE IF EXISTS `avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL DEFAULT '0',
  `data_inicio` datetime NOT NULL,
  `data_fim` datetime NOT NULL,
  `user_id` int unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_avaliacoes_user` (`user_id`),
  CONSTRAINT `FK_avaliacoes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
INSERT INTO `avaliacoes` VALUES (19,'0','2025-08-29 00:00:00','2025-09-30 00:00:00',71),(20,'0','2025-08-29 00:00:00','2025-09-30 00:00:00',71),(21,'enem','2025-09-09 00:00:00','2025-09-10 00:00:00',71),(22,'enem','2025-09-06 00:00:00','2025-09-09 00:00:00',71),(23,'ITA IMPOSSIVEL QUESTOES ','2024-08-12 00:00:00','2025-12-15 00:00:00',76);
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacoes_users`
--

DROP TABLE IF EXISTS `avaliacoes_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacoes_users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `avaliacao_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `feito` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `avaliacao_fk` (`avaliacao_id`),
  KEY `aluno_fk` (`user_id`),
  CONSTRAINT `aluno_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `avaliacao_fk` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes_users`
--

LOCK TABLES `avaliacoes_users` WRITE;
/*!40000 ALTER TABLE `avaliacoes_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacoes_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avisos`
--

DROP TABLE IF EXISTS `avisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avisos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL DEFAULT '0',
  `descricao` varchar(200) NOT NULL DEFAULT '0',
  `data_fim` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_avisos_user` (`user_id`),
  CONSTRAINT `FK_avisos_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avisos`
--

LOCK TABLES `avisos` WRITE;
/*!40000 ALTER TABLE `avisos` DISABLE KEYS */;
INSERT INTO `avisos` VALUES (24,'Prova','Amanhã será aplicada a prova do 2º bimestre, sobre trigonometria','2025-08-25 00:00:00',71),(25,'Prova','<p>Amanh&atilde; haver&aacute; outra prova sobre outra coisaaa!!!</p>','2025-08-25 00:00:00',71),(26,'Prova','<p>Amanh&atilde; &eacute; um novo dia</p>','2025-08-26 00:00:00',71),(27,'aviso','<p>aviso aviso</p>','2025-08-28 00:00:00',71),(28,'avisosss','<p>avisososos</p>','2025-08-30 00:00:00',71),(29,'AVISO2','<p>22222222222222222222222222222222222</p>\r\n<p>JSAIJSA</p>\r\n<p>SA</p>','2025-08-30 00:00:00',74),(30,'JISAI','<p>JEFAWIIOEWPAJFIWOE</p>\r\n<p>JSDIOJSA</p>','2025-08-30 00:00:00',74),(31,'PROVA ','<p>FJIAWO</p>','2025-08-31 00:00:00',74),(32,'Teste','<p>Aviso de teste</p>','2025-10-03 00:00:00',71);
/*!40000 ALTER TABLE `avisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (33,'Conjuntos'),(34,'Funções'),(35,'Trigonometria');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conteudos`
--

DROP TABLE IF EXISTS `conteudos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conteudos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL DEFAULT '0',
  `descricao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `bimestre` int NOT NULL,
  `serie` int NOT NULL,
  `categoria` int unsigned DEFAULT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_conteudos_categorias` (`categoria`),
  KEY `FK_conteudos_user` (`user_id`),
  CONSTRAINT `FK_conteudos_categorias` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id`),
  CONSTRAINT `FK_conteudos_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conteudos`
--

LOCK TABLES `conteudos` WRITE;
/*!40000 ALTER TABLE `conteudos` DISABLE KEYS */;
INSERT INTO `conteudos` VALUES (46,'Conjuntos','<p>Conjustos s&atilde;o cole&ccedil;&otilde;es de elementos.</p>',1,1,33,71),(47,'Polinômio','<p>ax&sup2;+bx+c=0</p>',3,1,34,76);
/*!40000 ALTER TABLE `conteudos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercicios`
--

DROP TABLE IF EXISTS `exercicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercicios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `descricao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `explicacao` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `tipo` int DEFAULT '1',
  `data_inicio` datetime DEFAULT NULL,
  `data_fim` datetime DEFAULT NULL,
  `user_id` int unsigned NOT NULL DEFAULT '1',
  `categoria_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_exercicios_user` (`user_id`),
  KEY `categoria_fk` (`categoria_id`),
  CONSTRAINT `categoria_fk` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  CONSTRAINT `FK_exercicios_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios`
--

LOCK TABLES `exercicios` WRITE;
/*!40000 ALTER TABLE `exercicios` DISABLE KEYS */;
INSERT INTO `exercicios` VALUES (231,'<p>1+1=?</p>',NULL,1,NULL,NULL,71,34),(232,'<p style=\"text-align: justify;\">(Enem 2020) Uma torneira est&aacute; gotejando &aacute;gua em um balde com capacidade de 18 litros. No instante atual, o balde se encontra com ocupa&ccedil;&atilde;o de 50% de sua capacidade. A cada segundo caem 5 gotas de &aacute;gua da torneira, e uma gota &eacute; formada, em m&eacute;dia, por 5&times;10<sup>-2</sup> ml de &aacute;gua.</p>\r\n<p>Quanto tempo, em hora, ser&aacute; necess&aacute;rio para encher completamente o balde, partindo do instante atual?</p>',NULL,1,NULL,NULL,76,35),(233,'<p>Quest&atilde;o 5. Encontre as ra&iacute;zes do polin&ocirc;mio p(x) = x4 &minus; 4x3 + 9x2 &minus; 10x &minus; 14, sabendo que<br>vale a rela&ccedil;&atilde;o p(1 + x) = p(1 &minus; x), para todo x &isin; C.</p>',NULL,1,NULL,NULL,76,NULL),(234,'<p>. (ESA &ndash; SARGENTO &ndash; EX&Eacute;RCITO &ndash; 2015) Dados<br>tr&ecirc;s pontos colineares A(x, 8), B(-3, y) e M(3, 5), determine<br>o valor de x + y, sabendo que M &eacute; ponto m&eacute;dio de AB</p>',NULL,1,NULL,NULL,76,NULL),(235,'<p>9. (ESA &ndash; SARGENTO &ndash; EX&Eacute;RCITO &ndash; 2013) Um co-<br>l&eacute;gio promoveu numa semana esportiva um campeonato<br>interclasses de futebol. Na primeira fase, entraram na dis-<br>puta 8 times, cada um deles jogando uma vez contra cada<br>um dos outros times. O n&uacute;mero de jogos realizados na 1a<br>fase foi</p>',NULL,1,NULL,NULL,76,NULL),(236,'<p>8. (ESA &ndash; SARGENTO &ndash; EX&Eacute;RCITO &ndash; 2013) Com re-<br>la&ccedil;&atilde;o aos n&uacute;meros complexos Z1= 2 + i e Z2= 1- i , onde i<br>&eacute; a unidade imagin&aacute;ria, &eacute; correto afirmar</p>',NULL,1,NULL,NULL,76,NULL);
/*!40000 ALTER TABLE `exercicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercicios_alternativas`
--

DROP TABLE IF EXISTS `exercicios_alternativas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercicios_alternativas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `exercicio_id` int unsigned DEFAULT '0',
  `alternativa_id` int unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_exercicios_alternativas_alternativas` (`alternativa_id`),
  KEY `FK_exercicios_alternativas_exercicios` (`exercicio_id`),
  CONSTRAINT `FK_exercicios_alternativas_alternativas` FOREIGN KEY (`alternativa_id`) REFERENCES `alternativas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_exercicios_alternativas_exercicios` FOREIGN KEY (`exercicio_id`) REFERENCES `exercicios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=482 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios_alternativas`
--

LOCK TABLES `exercicios_alternativas` WRITE;
/*!40000 ALTER TABLE `exercicios_alternativas` DISABLE KEYS */;
INSERT INTO `exercicios_alternativas` VALUES (465,231,471),(466,231,472),(467,232,473),(468,232,474),(469,232,475),(470,233,476),(471,233,477),(472,233,478),(473,233,479),(474,234,480),(475,234,481),(476,235,482),(477,235,483),(478,235,484),(479,236,485),(480,236,486),(481,236,487);
/*!40000 ALTER TABLE `exercicios_alternativas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercicios_avaliacoes`
--

DROP TABLE IF EXISTS `exercicios_avaliacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercicios_avaliacoes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `avaliacao_id` int unsigned DEFAULT '0',
  `exercicio_id` int unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_exercicios_avaliacoes_avaliacoes` (`avaliacao_id`),
  KEY `FK_exercicios_avaliacoes_exercicios` (`exercicio_id`),
  CONSTRAINT `FK_exercicios_avaliacoes_avaliacoes` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_exercicios_avaliacoes_exercicios` FOREIGN KEY (`exercicio_id`) REFERENCES `exercicios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios_avaliacoes`
--

LOCK TABLES `exercicios_avaliacoes` WRITE;
/*!40000 ALTER TABLE `exercicios_avaliacoes` DISABLE KEYS */;
INSERT INTO `exercicios_avaliacoes` VALUES (60,22,232),(61,23,231),(62,23,235),(63,23,233),(64,23,234);
/*!40000 ALTER TABLE `exercicios_avaliacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercicios_avaliacoes_users_alternativas`
--

DROP TABLE IF EXISTS `exercicios_avaliacoes_users_alternativas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercicios_avaliacoes_users_alternativas` (
  `exercicio_avaliacao_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `alternativa_id` int unsigned DEFAULT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `exercicio_avaliacao_fk` (`exercicio_avaliacao_id`),
  KEY `user_fk` (`user_id`),
  KEY `alternativa_fk` (`alternativa_id`),
  CONSTRAINT `alternativa_fk` FOREIGN KEY (`alternativa_id`) REFERENCES `alternativas` (`id`),
  CONSTRAINT `exercicio_avaliacao_fk` FOREIGN KEY (`exercicio_avaliacao_id`) REFERENCES `exercicios_avaliacoes` (`id`),
  CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios_avaliacoes_users_alternativas`
--

LOCK TABLES `exercicios_avaliacoes_users_alternativas` WRITE;
/*!40000 ALTER TABLE `exercicios_avaliacoes_users_alternativas` DISABLE KEYS */;
INSERT INTO `exercicios_avaliacoes_users_alternativas` VALUES (61,71,472,1),(62,71,484,2),(63,71,476,3),(64,71,480,4),(61,71,472,5),(62,71,483,6),(63,71,478,7),(64,71,481,8),(61,76,471,9),(62,76,483,10),(63,76,479,11),(64,76,481,12),(61,76,472,13),(62,76,483,14),(63,76,479,15),(64,76,481,16),(61,76,472,17),(62,76,483,18),(63,76,479,19),(64,76,480,20),(61,71,472,21),(62,71,482,22),(63,71,477,23),(64,71,481,24),(61,71,472,25),(62,71,482,26),(63,71,477,27),(64,71,481,28),(61,71,472,29),(62,71,482,30),(63,71,477,31),(64,71,481,32),(61,71,472,33),(62,71,482,34),(63,71,477,35),(64,71,481,36),(61,71,472,37),(62,71,483,38),(63,71,477,39),(64,71,480,40);
/*!40000 ALTER TABLE `exercicios_avaliacoes_users_alternativas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercicios_conteudos`
--

DROP TABLE IF EXISTS `exercicios_conteudos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercicios_conteudos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_exercicio` int unsigned DEFAULT '0',
  `id_conteudo` int unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_exercicios` (`id_exercicio`),
  KEY `FK_conteudos` (`id_conteudo`),
  CONSTRAINT `FK_conteudos` FOREIGN KEY (`id_conteudo`) REFERENCES `conteudos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_exercicios` FOREIGN KEY (`id_exercicio`) REFERENCES `exercicios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios_conteudos`
--

LOCK TABLES `exercicios_conteudos` WRITE;
/*!40000 ALTER TABLE `exercicios_conteudos` DISABLE KEYS */;
INSERT INTO `exercicios_conteudos` VALUES (85,231,46),(86,232,46),(87,233,47),(88,234,47),(89,235,46),(90,236,47);
/*!40000 ALTER TABLE `exercicios_conteudos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turmas`
--

DROP TABLE IF EXISTS `turmas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turmas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `serie` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turmas`
--

LOCK TABLES `turmas` WRITE;
/*!40000 ALTER TABLE `turmas` DISABLE KEYS */;
INSERT INTO `turmas` VALUES (15,'105',1),(16,'104',1),(18,'102',1),(19,'205',2);
/*!40000 ALTER TABLE `turmas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0',
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `password` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `role` int NOT NULL DEFAULT '0',
  `cpf` varchar(100) NOT NULL DEFAULT '0',
  `turma` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_users_turmas` (`turma`),
  CONSTRAINT `FK_users_turmas` FOREIGN KEY (`turma`) REFERENCES `turmas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (71,' Yan','yanmartinsporto@gmail.com','$2a$10$YBsFBMUAS0DsBBNAAvhmpO2YicD3YCoWaECY.BsS0Am0VgYOLI966',1,'00000000000000',19),(72,'Yan2','martinsportofigueirayan@gmail.com','$2a$10$DQIYvBprZ.SMsmWrHM8kbOigzS/.uHQGh9plEz38DYrJOCpQjtCW.',0,'00000000000000',NULL),(73,'Yan3','yanmartinsporto3@gmail.com','$2a$10$RtVVZKdXJd.zkWCsobThde8FEWU7NmyQU3etuKw1NCJlvwcZyKqqW',1,'00000000000000',NULL),(74,' Yan4','yanmartinsporto4@gmail.com','$2a$10$wRrrQF2mQrOP6MSQdEuwse/tpG5SQoJWGtxpKj.JpNtAnYyJ8e5e2',0,'00000000000000',19),(75,'0','yanmartinsporto5@gmail.com','$2a$10$IHf9tqSHMYwgThXNZVwGTO19kfULrZmXm.Zunv0qozKXt.Oag2xlC',0,'00000000000000',NULL),(76,' Yuri larcher Castelo Branco','yuricastelo2008@gmail.com','$2a$10$B8IhObdYWSQtYfL.q7NlYOCef7eHMdx2NGoG/LuUv9odGoNqnEtme',1,'185.927.397-13',19),(77,'André ','ca496783@gmail.com','$2a$10$QKreIgDDly.KvDsqphJDjefIvyvhZs4X8JHjziAJtuGIUWYXGp5aG',0,'139.880.757-25',16);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-10 15:24:45
