CREATE DATABASE IF NOT EXISTS chat;

USE chat;


  /* Describe your table here.*/

/* Create other tables and define schemas for them here! */

CREATE TABLE Usernames(id Integer PRIMARY KEY, Name Text);
CREATE TABLE Rooms(id Integer PRIMARY KEY, Name Text);

CREATE TABLE messages (id Integer PRIMARY KEY, Body Text, Rooms_id Integer, Usernames_id Integer, 
  FOREIGN KEY(Rooms_id) References Rooms(id), FOREIGN KEY(Usernames_id) References Usernames(id));
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

