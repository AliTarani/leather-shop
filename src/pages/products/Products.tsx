import { useEffect, useState } from "react";
import * as Comlink from "comlink";

import useProducts from "../../features/products/hooks/useProducts";
import Product from "../../features/products/types/product.type";
import { type Exposed } from "../../features/products/workers/filter-products.worker";

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

async function searchProducts(allProducts: Array<Product>, input: string) {
  return filteredProducts.searchProducts(allProducts, input);
}

const ProductPage = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] =
    useState<Array<Product>>(products);

  useEffect(() => {
    searchProducts(products, searchTerm).then((res) => {
      setFilteredProducts(res);
    });
  }, [products, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Search Input */}
      <div className="mb-6 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="جستجو کنید..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-center mb-8">محصولات چرم</h1>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={"./src/assets/images/products/" + product.image}
                alt={product.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <h2 className="text-xl font-medium text-gray-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {product.description}
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-4">
                  {product.price.toLocaleString()} تومان
                </p>
              </div>
              <div className="p-4">
                <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                  افزودن به سبد خرید
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            محصولی یافت نشد
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
