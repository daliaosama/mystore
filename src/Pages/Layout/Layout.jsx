import "./Layout.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "/assets/my Store.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cart from "/assets/cart.png";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import image from "/assets/images.jpeg";
import woman from "/assets/head.jpg";
function Layout() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(
          response.data.products.filter(
            (product) => product.category !== "groceries"
          )
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 8000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 344,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [autoCompleteSuggestion, setAutoCompleteSuggestion] = useState("");
  useEffect(() => {
    if (searchQuery.trim()) {
      const match = products.find((product) =>
        product.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

      if (match) {
        setAutoCompleteSuggestion(match.title);
      } else {
        setAutoCompleteSuggestion("");
      }
    } else {
      setAutoCompleteSuggestion("");
    }
  }, [searchQuery, products]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const matchedProduct = products.find((product) =>
        product.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

      if (matchedProduct) {
        // Redirect to the product page based on its ID
        navigate(`/product/${matchedProduct.id}`);
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Tab" && autoCompleteSuggestion) {
      e.preventDefault();
      setSearchQuery(autoCompleteSuggestion);
    }
  };

  return (
    <main>
      <header>
        <div id="Logo">
          <img src={logo} id="logo" />
          <h3>Storey</h3>
        </div>
        <img src={image} className="Img" />
        <nav>
          <div id="links">
            <Link to="/">Home</Link>
            <Link to="/Contact">Contact</Link>
            <Link to="/Shop">Shop</Link>
          </div>

          <form onSubmit={handleSearch} id="Search">
            <input
              type="search"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=" Search for products..."
              onKeyDown={handleKeyDown}
            />
            <input type="submit" value="Search" id="searchbtn"></input>
            {autoCompleteSuggestion &&
              searchQuery !== autoCompleteSuggestion && (
                <input
                  type="text"
                  value={autoCompleteSuggestion}
                  readOnly
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    padding: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    color: "#ccc",
                    pointerEvents: "none", // Make the suggestion unclickable
                  }}
                />
              )}
               
          </form>
        </nav>
        <img src={woman} className="Img" />
        <Link to="/Cart">
          <img src={cart} id="cart" />
        </Link>
      </header>
      <Slider {...settings} className="slider">
        {products.map((product) => (
          <Link to={`/Product/${product.id}`} key={product.id}>
            <div>
              <img src={product.images[0]} className="img" />
            </div>
          </Link>
        ))}
      </Slider>

      <Outlet></Outlet>
      <footer>
        <div id="bottom">
          <div id="Logo">
            <img src={logo} id="logo" />
            <h3>Storey</h3>
          </div>

          <nav id="Links">
            <h4>Links</h4>
            <Link to="/">Home</Link>
            <Link to="/Contact">Contact</Link>
            <Link to="/Shop">Shop</Link>
          </nav>
        </div>

        <hr />
        <p>©Storey 2024 All rights reverved</p>
      </footer>
    </main>
  );
}
export default Layout;
