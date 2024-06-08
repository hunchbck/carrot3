-- CreateTable
CREATE TABLE "C3User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "github_id" TEXT,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "C3User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "C3SMSToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "C3SMSToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "C3User_username_key" ON "C3User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "C3User_email_key" ON "C3User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "C3User_phone_key" ON "C3User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "C3User_github_id_key" ON "C3User"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "C3SMSToken_token_key" ON "C3SMSToken"("token");

-- AddForeignKey
ALTER TABLE "C3SMSToken" ADD CONSTRAINT "C3SMSToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "C3User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
