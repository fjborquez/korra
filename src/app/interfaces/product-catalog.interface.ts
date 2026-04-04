import { ProductBrand } from "./product-brand.interface";
import { ProductCategory } from "./product-category.interface";
import { ProductPresentation } from "./product-presentation.interface";
import { ProductType } from "./product-type.interface";

export interface ProductCatalog {
  id: number;
  category_id: number;
  brand_id: number;
  type_id: number;
  presentation_id: number;
  category: ProductCategory;
  brand: ProductBrand;
  type: ProductType;
  presentation: ProductPresentation;

}
