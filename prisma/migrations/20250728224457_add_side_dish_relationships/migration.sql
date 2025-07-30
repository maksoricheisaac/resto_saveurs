-- CreateTable
CREATE TABLE "side_dishes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "side_dishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item_side_dishes" (
    "id" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,
    "sideDishId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menu_item_side_dishes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "menu_item_side_dishes_menuItemId_sideDishId_key" ON "menu_item_side_dishes"("menuItemId", "sideDishId");

-- AddForeignKey
ALTER TABLE "menu_item_side_dishes" ADD CONSTRAINT "menu_item_side_dishes_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_side_dishes" ADD CONSTRAINT "menu_item_side_dishes_sideDishId_fkey" FOREIGN KEY ("sideDishId") REFERENCES "side_dishes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
