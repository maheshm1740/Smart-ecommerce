import { useEffect, useState } from "react";
import { getProduct, recomendationApi } from "../api/productApi";
import { getCurrentUserApi } from "../api/authApi";
import ProductList from "../components/product/ProductList";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const{auth}=useAuth();
  console.log(auth.user?.id);
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const user = await getCurrentUserApi();
      console.log("User:", user);

      const products = await getProduct();
      setProducts(products);

      if (user?.id) {
        const recommended = await recomendationApi(user.id); // ✅ after fix
        setRecommended(recommended);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };
  fetchData();
}, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-8 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        
        {/* Recommended Products */}
        <ProductList products={recommended} title="Recommended for You" />

        {/* All Products */}
        <ProductList products={products} title="All Products" />
      </div>
    </div>
  );
}
