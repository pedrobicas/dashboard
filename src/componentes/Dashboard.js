import React from "react";
import Grafico from "./lineGrafico";
import GraficoPie from "./pieGrafico";
import { Container, Row, Col } from 'react-bootstrap'

function Dashboard() {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col><Grafico /></Col>
        <Col><GraficoPie /></Col>
      </Row>
    </Container>
  );
}

export default Dashboard;



