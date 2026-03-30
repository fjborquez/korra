import { InventoryProductStatusPivot } from "./inventory-product-status-pivot.interface";

export interface InventoryProductStatus {
  id: number;
  description: string;
  is_final_phase: number;
  pivot?: InventoryProductStatusPivot;
}
