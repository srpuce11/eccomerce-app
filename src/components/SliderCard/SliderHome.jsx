import React, {useEffect,useState} from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap"
import SlideCard from "./SlideCard"

const SliderHome = () => {
  const settings = {
    nav:false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/men's%20clothing")
      .then(res => res.json())
      .then(json => setData(json));
  }, []);


  return (
      <section className='homeSlide'>
        <Container>
          <Slider {...settings}>
          {data?.map((item, index) => (
            <SlideCard
              key={index}
              title={item.title}
              cover={item.image}
              desc={item.description}
            />
          ))}
        </Slider>
        </Container>
      </section>
  )
}

export default SliderHome
