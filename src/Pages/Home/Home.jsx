import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link , useNavigate} from "react-router-dom";
import dress from "/assets/dress.jpeg"
import women from "/assets/dresses.jpg"
import womendress from "/assets/women.webp"
import men from "/assets/men.webp"
import devices from '/assets/devices.png'
import man from '/assets/man.jpg'
import media from '/assets/sneaker.png'
import sneaker from '/assets/sneaker.jpg'
import sneaker1 from '/assets/sneaker1.jpg'
function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 344,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }}]
  };
  const categoryImages = {
    "Beauty": "/assets/beauty.jpg",
    "Fragrances": "/assets/Fragrances.jpg",
    "Furniture": "/assets/furniture.jpg",
    "Groceries": "/assets/groceries.png",
    "Skin Care": "/assets/skincare.png",
    "Home Decoration": "/assets/home-decoration.jpg",
    "Kitchen Accessories": "/assets/kitchen-accessories.jpeg",
    "Laptops": "/assets/laptops .png",
    "Mens Shirts": "/assets/mens-shirts.jpg",
    "Mens Shoes":"/assets/menshoes.webp",
    "Mens Watches":"/assets/menwatches.png",
    "Womens Dresses":"/assets/dresses.jpg",
    "Womens Bags":"/assets/bags.jpg",
    "Womens Jewellery":"/assets/jewllery.png",
    "Womens Shoes":"/assets/womens shoes.webp",
    "Womens Watches":"/assets/womenwatches.png",
    "Sunglasses":"/assets/sunglasses.jpg",
    "Tops":"/assets/tops.webp",
    "Mobile Accessories":"/assets/mobileaccessories.png",
    "Tablets":"assets/tablets.jpg",
    "Smartphones":"/assets/smartphones.jpg",
    "Vehicle":"/assets/vechile.png",
    "Motorcycle":"/assets/motorcycle.jpg",
    "Sports Accessories":"/assets/sportsaccessories.jpg"
  };
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategories(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);
  const navigate = useNavigate(); 
  const handleImageClick = () => {
    navigate('/shop/womens-dresses');  // Redirect to women's dresses category
  };
  const handleClick=()=>{
    navigate('/shop/mens-shirts')
  }
  const handleSneakers=()=>{
    navigate('/shop/mens-shoes')
  }
const images=[
  '/assets/shop.webp',
'/assets/home.webp',
'/assets/home1.webp',
'/assets/home2.webp',
'/assets/home3.webp',
]
const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(false);
useEffect(()=>{
  const interval = setInterval(() => {
    setFade(true);
    setTimeout(()=>{
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      setFade(false);  
    },500)
  
},5000)
return () => clearInterval(interval);
},[images.length])
  return (
    <div className="home">
      <Slider {...settings} className="slider">
        {categories.map((category) => (
          <Link to={`/shop/${category.slug}`}key={category}>
            <div className="category">
              <h4>{category.name}</h4>
              <img
                src={categoryImages[category.name]}
                alt={category.name}
                className="imgcategoriey"
              />
            </div>
          </Link>
        ))}
      </Slider>
      
      <div id="collections" >
        
        <strong><h1>#See our  new Summer Dresses Collections </h1></strong>
        <div id="dressimages" onClick={handleImageClick}>
        <img src={categoryImages["Tops"]} className="dress" />
        <img src={dress} className="dress" />
        <img src={women} className="dress" />
        <img src={womendress}className="dress" />
        </div>
        <h1>Amazing Brands</h1>
        <div id="Shophome" className={`image-container ${fade ? 'fade' : ''}`}>
        <img src= {images[currentImage]} className="imgHome"/>
        <img src={devices} id="devices" />
        </div>
        <h1>New Arrival for Mens Collections</h1>
        <div id="mensCollection" onClick={handleClick}>
        <img src={men} className="men" />
        <img src={man} className="men" />
        <img src={categoryImages["Mens Shoes"]} className="men" />
        </div>
        <h1>Modern comfortable Sneakers </h1>
        <div id="Sneakers" onClick={handleSneakers}>
        <img src={media} className="men" />
        <img src={sneaker1}  className="men" />
        <img src={sneaker} className="men" />
        </div>
        
      </div>
      
     
    </div>
  );
}
export default Home;
