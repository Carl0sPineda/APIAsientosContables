-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Seating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "debit" DECIMAL NOT NULL,
    "credit" DECIMAL NOT NULL,
    "detail" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "numDoc" TEXT NOT NULL,
    "asn" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Seating_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
