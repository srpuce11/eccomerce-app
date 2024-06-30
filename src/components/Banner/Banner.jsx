import { Col, Container, Row } from "react-bootstrap";
import "./banner.css";
import { useState, useEffect } from "react";
const Banner = ({title}) => {

    const [productBg, setProductBg] = useState('');
    useEffect(() => {
        fetch('https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg')
          .then(res => res.url)
          .then(url => setProductBg(url));
      }, []);   
    return ( 
        <div className="image-container">
            <img src={productBg} alt="Product-bg" />
            <div className="overlay">
                <Container>
                    <Row>
                        <Col>
                            <h2>{title}</h2>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Banner;