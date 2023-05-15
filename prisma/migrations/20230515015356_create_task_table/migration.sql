-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `deadlineDate` DATETIME(3) NOT NULL,
    `employeeId` INTEGER NOT NULL,
    `finishedAt` DATETIME(3) NULL,
    `taskStatus` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL,
    `taskSalary` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
