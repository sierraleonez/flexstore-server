-- CreateTable
CREATE TABLE "access_token" (
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "access_token_token_key" ON "access_token"("token");
