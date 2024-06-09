-- CreateTable
CREATE TABLE "C3User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT,
    "emailCertified" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "mobile" TEXT,
    "mobileCertified" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT,
    "socialOnly" BOOLEAN NOT NULL DEFAULT false,
    "socialInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

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

-- CreateTable
CREATE TABLE "C3ChatRoom" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "C3ChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "C3Message" (
    "id" SERIAL NOT NULL,
    "payload" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "chatRoomId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "C3Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_C3ChatRoomToC3User" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "C3User_username_key" ON "C3User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "C3User_email_key" ON "C3User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "C3User_mobile_key" ON "C3User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "C3SMSToken_token_key" ON "C3SMSToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "_C3ChatRoomToC3User_AB_unique" ON "_C3ChatRoomToC3User"("A", "B");

-- CreateIndex
CREATE INDEX "_C3ChatRoomToC3User_B_index" ON "_C3ChatRoomToC3User"("B");

-- AddForeignKey
ALTER TABLE "C3SMSToken" ADD CONSTRAINT "C3SMSToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "C3User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "C3Message" ADD CONSTRAINT "C3Message_chatRoomId_fkey" FOREIGN KEY ("chatRoomId") REFERENCES "C3ChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "C3Message" ADD CONSTRAINT "C3Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "C3User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_C3ChatRoomToC3User" ADD CONSTRAINT "_C3ChatRoomToC3User_A_fkey" FOREIGN KEY ("A") REFERENCES "C3ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_C3ChatRoomToC3User" ADD CONSTRAINT "_C3ChatRoomToC3User_B_fkey" FOREIGN KEY ("B") REFERENCES "C3User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
