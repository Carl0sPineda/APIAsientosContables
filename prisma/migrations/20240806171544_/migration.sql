/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Seating` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Category" ("id", "name") SELECT "id", "name" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
CREATE TABLE "new_Seating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "debit" DECIMAL,
    "credit" DECIMAL,
    "detail" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "numDoc" TEXT NOT NULL,
    "asn" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Seating_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seating" ("asn", "categoryId", "credit", "date", "debit", "description", "detail", "id", "numDoc") SELECT "asn", "categoryId", "credit", "date", "debit", "description", "detail", "id", "numDoc" FROM "Seating";
DROP TABLE "Seating";
ALTER TABLE "new_Seating" RENAME TO "Seating";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
