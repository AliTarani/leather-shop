import * as Comlink from "comlink";
import { search } from "../../../core/utils/search";
import Product from "../types/product.type";

export function searchProducts(products, filter: string) {
  return search<Product>(products, filter, {
    keys: ["name", "description"],
  });
}

const exposed = {
  searchProducts,
};

Comlink.expose(exposed);
export type Exposed = typeof exposed;
