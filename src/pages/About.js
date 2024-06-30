import { Container, Row, Col, Card } from "react-bootstrap";


const About = () => {
  return ( <Container>
    <Row className="mt-5">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>About Us</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla felis mauris, consequat nec rhoncus et, imperdiet
              sit amet nisl. Duis euismod metus vitae risus dictum, eget
              sagittis dui sagittis.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Our Mission</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla felis mauris, consequat nec rhoncus et, imperdiet
              sit amet nisl. Duis euismod metus vitae risus dictum, eget
              sagittis dui sagittis.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Our Vision</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla felis mauris, consequat nec rhoncus et, imperdiet
              sit amet nisl. Duis euismod metus vitae risus dictum, eget
              sagittis dui sagittis.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}

export default About
