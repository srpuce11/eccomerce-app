import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../components/auth/auth";
import { Container, Row, Col, Button, ListGroup, Card } from 'react-bootstrap';

export const OrderSummary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const { items, totalPrice } = location.state || {};
  const taxRate = 18 / 100;
  const totalPriceFloat = parseFloat(totalPrice);
  const totalTax = (totalPriceFloat * taxRate).toFixed(2);
  const totalValue = (totalPriceFloat + parseFloat(totalTax)).toFixed(2);

  return (
    <>
      <Container>
        {user ? (
          <Card className="mt-5">
            <Card.Header as="h2">Order Summary</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>Items:</h3>
                  <ul className="list-unstyled">
                    {items && items.map((item, index) => (
                      <li key={index}>
                        <div className="d-flex justify-content-between">
                          <span>{item.title} - {item.qty} x {item.price.toFixed(2)}</span>
                          <span>= {(item.qty * item.price).toFixed(2)}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col><h4>Total Price:</h4></Col>
                    <Col className="text-right"><h4>{totalPriceFloat.toFixed(2)}</h4></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col><h4>Tax (18%):</h4></Col>
                    <Col className="text-right"><h4>{totalTax}</h4></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col><h4>Total with Tax:</h4></Col>
                    <Col className="text-right"><h4>{totalValue}</h4></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Your order is confirmed by the Merchant and will be delivered soon.....!</p>
                </ListGroup.Item>
                <ListGroup.Item className="text-center">
                  <Button variant="primary" onClick={() => navigate(-1)}>Go back</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ) : (
          <p>Please Login to Order</p>
        )}
      </Container>
    </>
  );
};
