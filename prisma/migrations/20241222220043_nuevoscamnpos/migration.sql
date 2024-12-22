-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category_id" TEXT,
ADD COLUMN     "currency_id" TEXT NOT NULL DEFAULT 'CLP',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "picture_url" TEXT;
