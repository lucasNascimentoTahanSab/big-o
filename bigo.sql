-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 26-Nov-2021 às 02:51
-- Versão do servidor: 5.7.31
-- versão do PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bigo`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `comentario`
--

DROP TABLE IF EXISTS `comentario`;
CREATE TABLE IF NOT EXISTS `comentario` (
  `idUsuario` int(10) NOT NULL,
  `idPublicacao` int(10) NOT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nomeUsuario` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `fotoUsuario` longblob,
  `descricao` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `USUARIO` (`idUsuario`),
  KEY `PUBLICACAO` (`idPublicacao`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `favorito`
--

DROP TABLE IF EXISTS `favorito`;
CREATE TABLE IF NOT EXISTS `favorito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(10) NOT NULL,
  `idPublicacao` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `USUARIO` (`idUsuario`),
  KEY `PUBLICACAO` (`idPublicacao`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `publicacao`
--

DROP TABLE IF EXISTS `publicacao`;
CREATE TABLE IF NOT EXISTS `publicacao` (
  `titulo` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `descricao` varchar(10000) COLLATE utf8_unicode_ci NOT NULL,
  `imagem` longblob,
  `idUsuario` int(10) NOT NULL,
  `nomeUsuario` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `fotoUsuario` longblob,
  `dataPublicacao` date NOT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `USUARIO` (`idUsuario`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `publicacao`
--

INSERT INTO `publicacao` (`titulo`, `descricao`, `imagem`, `idUsuario`, `nomeUsuario`, `fotoUsuario`, `dataPublicacao`, `id`) VALUES
('O que é a inteligência artificial?', 'A inteligência artificial é um ramo da ciência da computação que busca simular a inteligência humana em uma máquina. Os sistemas de IA são regidos por algoritmos usando técnicas como machine learning e deep learning para demonstrar comportamento “inteligente”.\r\nA tecnologia teve sua definição conceitual nos idos dos anos 1950, na Universidade de Carnegie Mellon. Os cientistas Herbert Simon e Allen Newell foram os pais dessa ciência, criando, nessa universidade, o primeiro laboratório dedicado à inteligência artificial no âmbito acadêmico.', 0x69616a7065672e6a706567, 1, 'Lucas Nascimento ', NULL, '2021-11-25', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `nome` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `senha` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `foto` longblob,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Tabela responsável pelo armazenamento dos usuários';

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`nome`, `email`, `senha`, `foto`, `id`) VALUES
('Lucas Nascimento ', 'lucas.tahansab@yahoo.com', '0843643rl', NULL, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
