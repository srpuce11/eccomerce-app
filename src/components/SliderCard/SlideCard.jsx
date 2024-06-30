import { Col, Container, Row } from "react-bootstrap";
import "./slidercard.css";
import { useNavigate, useLocation } from "react-router-dom";

const SlideCard = ({ title, desc, cover }) => {
  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/shop");
  };

  return (
    <Container className="box">
      <Row>
        <Col md={6}>
          <h1>{title}</h1>
          <p>{desc}</p>
          <button className="btn-primary" onClick={goToCart}>
            Visit Collections
          </button>
        </Col>
        <Col md={6}>
          <img src={cover} alt="#" />
        </Col>
      </Row>
    </Container>
  );
};

export default SlideCard;
