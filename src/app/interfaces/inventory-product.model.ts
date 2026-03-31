import { InventoryProductStatus } from "./inventory-product-status.interface";

export interface InventoryProduct {
  id: number;
  house_id: number;
  house_description: string;
  quantity: number;
  uom_id: number;
  uom_description: string;
  uom_abbreviation: string;
  purchase_date: Date;
  expiration_date: Date;
  catalog_id: number;
  catalog_description: string;
  brand_id: number;
  brand_name: string;
  category_id: number;
  category_name: string;
  merged_id: number | null;
  old_inventory: number | null;
  product_status: InventoryProductStatus[];
}
