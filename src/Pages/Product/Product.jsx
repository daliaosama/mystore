import "./Product.css";
import { useState, useEffect ,useContext} from "react";
import { useParams ,Link} from "react-router-dom";
import axios from "axios";
import { CartContext} from "../../App";

function Product() {
  const { addToCart}=useContext(CartContext)
 
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity]= useState(0);
  const [subtotal, setSubtotal] = useState(0); 
  function Increment() {
    setQuantity(quantity + 1);
  }
  function Decrement() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }}
    function handleClick(){ 
      if (quantity > 0) { 
      const products= {
        ...product,
        quantity: quantity,
       subtotal:subtotal
      };
      addToCart(products);
    
    }}
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
        setSubtotal(response.price);
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  useEffect(() => {
    if (product) {
      setSubtotal(product.price * quantity);
    }
  }, [quantity, product]);
  return (
    <div id="productpage">
      {loading ? (
        <p>Loading product details...</p>
      ) : (
        
        <div key={product.id}  className="ProductItems">
          <div className="productDetails"  >
          <label className="lab">{product.title}</label>
          <div className="details">
          <div id="image">
            <img src={product.images[0]} className="imgProduct" />
          </div>
          <div className="productdata">
          <label className="lab">Description:</label>
            <p>{product.description}</p>
            <div className="price">
            <label className="lab">Price:</label>
            <label >{product.price}</label>
            </div>
            <div className="brand">
            <label className="lab">Brand:</label>
            <label htmlFor="">{product.brand}</label>
            </div>
            <div className="stock">
              <label className="lab">Stock:</label>
              <label htmlFor="">{product.stock}</label>
            </div>
            <div className="sku">
              <label className="lab">SKU:</label>
              <label htmlFor="">{product.sku}</label>
            </div>
           <div className="tags">
            <label className="lab">Tags:</label>
            <label htmlFor="">{product.tags}</label>
           </div>
           <div className="warrantyInformation">
            <label className="lab">Warranty Information:</label>
            <label htmlFor="">{product.warrantyInformation}</label>
           </div>
           <div id="button">
            <div className="counter">
              <button className="btn" onClick={Decrement}>
                -
              </button>
              <label id="count">{quantity}</label>
              <button className="btn" onClick={Increment}>
                +
              </button>
            </div>
            <Link to="/Cart">
            <button id="addtocart" onClick={handleClick}>Add  to Cart</button>
            </Link>
            </div>
            
            
          </div>
          </div>
          </div>
          <div className="images">
          <img src={product.images[0]} className="img2" /> 
          <img src={product.images[1]} className="img2" />
          <img src={product.images[2]} className="img2" />
          </div>
          </div>
          
       
      )}
    </div>
  );
}
export default Product;
