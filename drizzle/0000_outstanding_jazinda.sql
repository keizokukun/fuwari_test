CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`author` text,
	`content` text,
	`post_slug` text,
	`post_date` text
);
