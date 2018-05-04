/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-05-04 18:37:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cart`
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `shop_id` int(11) NOT NULL DEFAULT '0',
  `goods_id` int(11) NOT NULL,
  `goods_name` varchar(255) NOT NULL,
  `goods_number` int(11) NOT NULL,
  `goods_price` double(7,2) NOT NULL,
  `add_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('1', '1', '0', '1', '2121', '1', '1.00', '0');

-- ----------------------------
-- Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `goods_sn` varchar(45) NOT NULL COMMENT '商品编码',
  `goods_name` varchar(255) NOT NULL COMMENT '商品名称',
  `goods_tag` int(11) NOT NULL DEFAULT '0' COMMENT '商品标签id',
  `goods_description` varchar(45) NOT NULL COMMENT '商品描述',
  `goods_price` double(7,2) NOT NULL COMMENT '商品价格',
  `goods_img_url` varchar(200) NOT NULL COMMENT '商品主图',
  `shop_id` int(11) NOT NULL COMMENT '店铺id',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '商品状态（0：下架中，1：销售中）',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('17', 'G001', '防晒霜', '1', '防晒霜描述', '100.00', 'https://res.wx.qq.com/mpres/htmledition/images/mp_qrcode3a7b38.gif', '1', '0', '1525348471');

-- ----------------------------
-- Table structure for `goods_photos`
-- ----------------------------
DROP TABLE IF EXISTS `goods_photos`;
CREATE TABLE `goods_photos` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) NOT NULL COMMENT '商品id',
  `goods_path` varchar(255) NOT NULL COMMENT '图片路径',
  `is_cover` int(11) DEFAULT '0',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序数字',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_photos
-- ----------------------------
INSERT INTO `goods_photos` VALUES ('2', '1', 'https://res.wx.qq.com/mpres/htmledition/images/mp_qrcode3a7b38.gif', '1', '0');
INSERT INTO `goods_photos` VALUES ('5', '17', 'https://res.wx.qq.com/mpres/htmledition/images/mp_qrcode3a7b38.gif', '1', '0');
INSERT INTO `goods_photos` VALUES ('6', '17', 'https://res.wx.qq.com/mpres/htmledition/images/mp_qrcode3a7b38.gif', '0', '1');
INSERT INTO `goods_photos` VALUES ('7', '1', 'https://res.wx.qq.com/mpres/htmledition/images/mp_qrcode3a7b38.gif', '0', '0');
INSERT INTO `goods_photos` VALUES ('8', '1', 'https://res.wx.qq.com/mpres/htmledition/images/mp_qrcode3a7b38.gif', '0', '0');

-- ----------------------------
-- Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT '0',
  `user_name` varchar(255) NOT NULL,
  `consignee` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `order_amount` double(7,2) NOT NULL,
  `goods_amount` double(7,2) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `add_time` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for `order_goods`
-- ----------------------------
DROP TABLE IF EXISTS `order_goods`;
CREATE TABLE `order_goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `goods_name` varchar(255) NOT NULL,
  `goods_number` int(11) NOT NULL,
  `goods_price` double(7,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_goods
-- ----------------------------

-- ----------------------------
-- Table structure for `shop`
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `shop_name` varchar(100) NOT NULL COMMENT '店铺名称',
  `shop_description` varchar(255) NOT NULL COMMENT '店铺描述',
  `wechat` varchar(100) NOT NULL COMMENT '微信',
  `mobile` int(11) NOT NULL COMMENT '手机号码',
  `city` varchar(45) NOT NULL COMMENT '城市',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '店铺状态（0：未激活，1：激活）',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop
-- ----------------------------

-- ----------------------------
-- Table structure for `tag`
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) NOT NULL COMMENT '店铺id',
  `tag_name` varchar(100) NOT NULL COMMENT '标签名称',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `shop_id` int(11) NOT NULL DEFAULT '0' COMMENT '店铺id',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态（0：禁用，1：启用）',
  `last_login_time` int(11) DEFAULT '0' COMMENT '最后登录时间',
  `last_login_ip` varchar(45) DEFAULT NULL COMMENT '最后登录ip',
  `sex` int(11) NOT NULL DEFAULT '0' COMMENT '性别（0：男，1：女）',
  `secret_key` varchar(32) NOT NULL COMMENT '用户密钥',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('3', 'xiangdong', '73873a85b6c2c4383d294dbaf7c5a044', '0', '0', '0', null, '0', 'd9abefc559e0414c05550fa17875ecb0', '1523794262');
INSERT INTO `user` VALUES ('4', 'hello', '19ebe7fcbfffc16d1f8ccbc9ce8f407d', '0', '0', '0', null, '1', '9200fd4e5f2c7efac033e50d7476be70', '1523960362');
INSERT INTO `user` VALUES ('6', 'uyuyuuy', 'd6a040c0ac3d1f220950b9b9c608541b', '1', '0', '1524127734', '127.0.0.1', '0', 'ec63be3f3a9f00cb805c80be95751e93', '1523792699');
