import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import SlideCard from "./SlideCard";

const SliderHome = () => {
  const settings = {
    nav: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const settings2 = {
    nav: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
  };

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/men's%20clothing")
      .then((res) => res.json())
      .then((json) => setData(json));
      fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((json) => setData2(json));
  }, []);

  return (
    <section className="homeSlide">
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
          <Slider {...settings2}>
          {data2?.map((item, index) => (
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
  );
};

export default SliderHome;
