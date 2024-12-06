import * as Comlink from "comlink";
import { type Exposed } from "./workers/filter-products.worker";
import Product from "./types/product.type";

const worker = new Worker(
  new URL(
    "../../features/products/workers/filter-products.worker",
    import.meta.url
  ),
  {
    type: "module",
  }
);

const filteredProducts = Comlink.wrap<Exposed>(worker);

export async function searchProducts(
  allProducts: Array<Product>,
  input: string
) {
  return filteredProducts.searchProducts(allProducts, input);
}
