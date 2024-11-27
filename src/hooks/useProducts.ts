import { useEffect, useState } from "react";

import crudService from "../core/services/crud.service";
import Product from "../types/product.type";

const productService = crudService("/products");

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const { request, cancel } = productService.getAll<Product>();
    request.then((data) => {
      setProducts(data);
    });

    return () => {
      cancel();
    };
  }, []);
  return { products, setProducts };
};

export default useProducts;
