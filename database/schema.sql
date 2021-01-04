-- database/schema.sql
CREATE DATABASE bookmarks_app_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

use bookmarks_app_test;

CREATE TABLE IF NOT EXISTS bookmark (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(255),
  title VARCHAR(255)
);

