# create databases
CREATE DATABASE IF NOT EXISTS `rootthebox` character set utf8mb4;

# create rootthebox user and grant rights
GRANT USER 'rootthebox'@'localhost' IDENTIFIED BY 'mysup3rs3cr3tpassw0rd';
GRANT ALL PRIVILEGES ON rootthebox.* TO 'rootthebox'@'localhost';

