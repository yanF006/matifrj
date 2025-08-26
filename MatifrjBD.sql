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

--
-- Table structure for table `alternativas`
--

CREATE DATABASE IF NOT EXISTS `matifrjBD` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `matifrjBD`;

DROP TABLE IF EXISTS `alternativas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alternativas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `conteudo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0',
  `correta` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=473 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alternativas`
--

LOCK TABLES `alternativas` WRITE;
/*!40000 ALTER TABLE `alternativas` DISABLE KEYS */;
INSERT INTO `alternativas` VALUES (471,'1',0),(472,'2',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacoes`
--

LOCK TABLES `avaliacoes` WRITE;
/*!40000 ALTER TABLE `avaliacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacoes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avisos`
--

LOCK TABLES `avisos` WRITE;
/*!40000 ALTER TABLE `avisos` DISABLE KEYS */;
INSERT INTO `avisos` VALUES (24,'Prova','Amanhã será aplicada a prova do 2º bimestre, sobre trigonometria','2025-08-25 00:00:00',71),(25,'Prova','<p>Amanh&atilde; haver&aacute; outra prova sobre outra coisaaa!!!</p>','2025-08-25 00:00:00',71),(26,'Prova','<p>Amanh&atilde; &eacute; um novo dia</p>','2025-08-26 00:00:00',71);
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conteudos`
--

LOCK TABLES `conteudos` WRITE;
/*!40000 ALTER TABLE `conteudos` DISABLE KEYS */;
INSERT INTO `conteudos` VALUES (46,'Conjuntos','<p>Conjustos s&atilde;o cole&ccedil;&otilde;es de elementos.</p>',1,1,33,71);
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
  PRIMARY KEY (`id`),
  KEY `FK_exercicios_user` (`user_id`),
  CONSTRAINT `FK_exercicios_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=232 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios`
--

LOCK TABLES `exercicios` WRITE;
/*!40000 ALTER TABLE `exercicios` DISABLE KEYS */;
INSERT INTO `exercicios` VALUES (231,'<p>1+1=?</p>',NULL,1,NULL,NULL,71);
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
) ENGINE=InnoDB AUTO_INCREMENT=467 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios_alternativas`
--

LOCK TABLES `exercicios_alternativas` WRITE;
/*!40000 ALTER TABLE `exercicios_alternativas` DISABLE KEYS */;
INSERT INTO `exercicios_alternativas` VALUES (465,231,471),(466,231,472);
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
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios_avaliacoes`
--

LOCK TABLES `exercicios_avaliacoes` WRITE;
/*!40000 ALTER TABLE `exercicios_avaliacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercicios_avaliacoes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios_conteudos`
--

LOCK TABLES `exercicios_conteudos` WRITE;
/*!40000 ALTER TABLE `exercicios_conteudos` DISABLE KEYS */;
INSERT INTO `exercicios_conteudos` VALUES (85,231,46);
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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (71,' Yan','yanmartinsporto@gmail.com','$2a$10$YBsFBMUAS0DsBBNAAvhmpO2YicD3YCoWaECY.BsS0Am0VgYOLI966',1,'00000000000000',19),(72,'Yan2','martinsportofigueirayan@gmail.com','$2a$10$DQIYvBprZ.SMsmWrHM8kbOigzS/.uHQGh9plEz38DYrJOCpQjtCW.',0,'00000000000000',NULL),(73,'Yan3','yanmartinsporto3@gmail.com','$2a$10$RtVVZKdXJd.zkWCsobThde8FEWU7NmyQU3etuKw1NCJlvwcZyKqqW',0,'00000000000000',NULL),(74,'Yan4','yanmartinsporto4@gmail.com','$2a$10$wRrrQF2mQrOP6MSQdEuwse/tpG5SQoJWGtxpKj.JpNtAnYyJ8e5e2',0,'00000000000000',NULL),(75,'0','yanmartinsporto5@gmail.com','$2a$10$IHf9tqSHMYwgThXNZVwGTO19kfULrZmXm.Zunv0qozKXt.Oag2xlC',0,'00000000000000',NULL);
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

-- Dump completed on 2025-08-25 10:01:36
