import { Routes,Route ,BrowserRouter} from 'react-router-dom'
import './App.css'
import Layout from './Pages/Layout/Layout'
import Home from './Pages/Home/Home';
import Contact from './Pages/Contact/Contact';
import Shop from './Pages/Shop/Shop';
import Product from './Pages/Product/Product';
import Cart from './Pages/Cart/Cart';
import{createContext,useState , useMemo} from'react'
export const CartContext  = createContext();
function App() {
  
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity,subtotal:item.subtotal+product.subtotal }
            : item
        )
      );
    } else {
      
      setCart([...cart, product]);
    }
    };
    const removeFromCart = (id) => {
      setCart((prevItems) => prevItems.filter(item => item.id !== id));
    };
    const totalPrice = useMemo(() => {
      return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cart]);
  return (
  <CartContext.Provider value={{cart, addToCart,removeFromCart , totalPrice }}>
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/Contact" element={<Contact/>}></Route>
      <Route path="/Shop" element={<Shop/>}></Route>
      <Route path="/shop/:category?" element={<Shop />}></Route>
      <Route path="/Product/:id" element={<Product/>}></Route>
      <Route path="/Cart" element={<Cart/>}></Route>
      </Route> 
    </Routes>
    
    </BrowserRouter>
    </CartContext.Provider>
    
  )
}

export default App
