-- AlterTable
CREATE SEQUENCE readnotifications_id_seq;
ALTER TABLE "ReadNotifications" ALTER COLUMN "id" SET DEFAULT nextval('readnotifications_id_seq');
ALTER SEQUENCE readnotifications_id_seq OWNED BY "ReadNotifications"."id";
