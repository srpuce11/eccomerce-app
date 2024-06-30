import { Link, Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Banner from "../components/Banner/Banner";
import { Fragment, useState, useEffect } from "react";
import FilterSelect from "../components/ShopParts/FilterSelect";
import ShopList from "../components/ShopParts/ShopList";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filterList, setFilterList] = useState([]);


  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilterList(data);       });
  }, []);

  return (
    <Fragment>
      <Banner title="buy nowwwww........." />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
            <Col md={8}></Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  );
};
