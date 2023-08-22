-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "detail_markdown" TEXT NOT NULL,
    "rundown_markdown" TEXT NOT NULL,
    "faq_markdown" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "bg_url" TEXT NOT NULL,
    "registration_url" TEXT NOT NULL,
    "participant_tags" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "event_location" TEXT NOT NULL,
    "event_material_tags" TEXT NOT NULL,
    "event_tags" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
