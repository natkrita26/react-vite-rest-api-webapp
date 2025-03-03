import { useState, useEffect } from "react";

function ProductList({ apiUrl }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${apiUrl}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [apiUrl]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>รายการสินค้า</h2>
      <input
        type="text"
        placeholder="ค้นหาสินค้า"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredProducts.map((p) => (
          <li key={p._id}>
            {p.name} - {p.price} บาท
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
