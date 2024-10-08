-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Seating" (
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

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
