import { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";
import { FaStar } from 'react-icons/fa'
import { useParams,Link } from "react-router-dom";
function Shop() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;

        if (category) {
          response = await axios.get(
            `https://dummyjson.com/products/category/${category}`
          );
        } else {
          response = await axios.get(`https://dummyjson.com/products`);
        }
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [category]);
  const renderStars = (rating) => {
    const totalStars = 5;
    return (
      <div>
        {[...Array(totalStars)].map((_, index) => (
          <FaStar
            key={index}
            color={index < Math.round(rating) ? "pink" : "#e4e5e9"}  // Pink stars for the rating, grey for empty stars
            style={{display:"inline"}} 
            />
        ))}
      </div>
    );
  };
  return (
    <div className="shop">
      <div id="product">
        {products.map((product) => (
          <Link to={`/Product/${product.id}`}key={product.id}>
            <div className="shopProduct">
              <h4>{product.title}</h4>
              <img src={product.images[0]} className="img" />
              <label>{product.category}</label>
              <p>Price: {product.price}</p>
              <div className="rating">
              {renderStars(product.rating)}
            </div>
              <button id="shop">Shop Now</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Shop;
