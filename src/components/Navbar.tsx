import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import {NavLink} from "react-router-dom"

export function Navbar() {
  return (
    <NavbarBs className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Add patient
          </Nav.Link>
          <Nav.Link to="/allPatients" as={NavLink}>
            All patients
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBs>
  );
}
