import './Cart.css'
import{ useContext } from 'react'
import { CartContext } from "../../App";
import deleteimg from '/assets/delete.png'
function Cart(){
    const {cart, totalPrice} = useContext(CartContext)
    const {  removeFromCart } = useContext(CartContext);
     const handleRemove = (id) => {
      removeFromCart(id);
    }; 
    return(
        <div id="Cart">
 <div id="cartproducts">
        <div id="top">
        <h4>Product</h4>
        <h4>Price</h4>
        <h4>Quantity</h4>
        <h4>Subtotal</h4>
        </div>
        {cart.map((item) => (
        <div className="cartdetails" key={item.id}>
          <div className="productname">
          <img src={item.images[0]} className='imgcart'/>
          <label className="label">
            {item.title} </label>
          </div>
         <div className="price"> 
          <label className='label'>Rs. {item.price}</label>
          </div>
         
        <div className="quantity">
          <label >{item.quantity}</label>
        </div>  
        <div className="cost">
        <label >Rs. {item.subtotal?.toFixed(2)}</label>
        </div>
        <img src={deleteimg} id="del" onClick={() => handleRemove(item.id)}/>

        </div>
      ))}
     </div>
     <div className="total">
      <h4>Total</h4>
     
         <label id="Total">
          RS. {totalPrice.toFixed(2)}</label>
          <button id="checkout">Check Out</button>
     </div>
        </div>
    )
}
export default Cart