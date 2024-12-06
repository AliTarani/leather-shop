import { useEffect, useState } from "react";
// import crudService from "../../../core/services/crud.service";
import Product from "../types/product.type";
import ALL_PRODUCTS from "../mock/products.mock";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setProducts(ALL_PRODUCTS);
  }, []);

  // useEffect(() => {
  //   const productService = crudService("/products");
  //   const { request, cancel } = productService.getAll<Product>();
  //   request.then((data) => {
  //     setProducts(data);
  //   });

  //   return () => {
  //     cancel();
  //   };
  // }, []);
  return { products, setProducts };
};

export default useProducts;
