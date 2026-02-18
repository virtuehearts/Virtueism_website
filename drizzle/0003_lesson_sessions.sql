CREATE TABLE IF NOT EXISTS `lessonSession` (
  `id` text PRIMARY KEY NOT NULL,
  `userId` text NOT NULL,
  `day` integer NOT NULL,
  `virtue` text NOT NULL,
  `preLessonText` text NOT NULL,
  `quiz` text NOT NULL,
  `answers` text DEFAULT '[]' NOT NULL,
  `score` integer DEFAULT 0 NOT NULL,
  `totalQuestions` integer DEFAULT 0 NOT NULL,
  `submittedAt` integer,
  `createdAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
  `updatedAt` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE UNIQUE INDEX IF NOT EXISTS `lessonSession_user_day_unq` ON `lessonSession` (`userId`,`day`);
CREATE INDEX IF NOT EXISTS `lessonSession_user_idx` ON `lessonSession` (`userId`);
