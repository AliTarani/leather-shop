import { useEffect, useState } from "react";

import crudService from "../../../core/services/crud.service";
import Product from "../types/product.type";
import ALL_PRODUCTS from "../mock/products.mock";

const productService = crudService("/products");

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (process["REACT_APP_ENV"] == "development") {
      setProducts(ALL_PRODUCTS);
    } else {
      const { request, cancel } = productService.getAll<Product>();
      request.then((data) => {
        setProducts(data);
      });

      return () => {
        cancel();
      };
    }
  }, []);
  return { products, setProducts };
};

export default useProducts;
