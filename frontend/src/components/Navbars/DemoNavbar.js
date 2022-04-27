import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import apiurls from "../../environment/environment.js";
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const DemoNavbar = (props) => {
  const { history } = props;

  const [error, setError] = useState("");

  const doLogout = async () => {
    try {
      const data = await axios.get(apiurls.logoutApi).then((res) => {
        if (res.status != 200) {
          setError(error.message);
        }
        history.push("/");
      });
    } catch (error) {
      setError("Unable to Logout");
    }
  };

  const handleLogout = (evt) => {
    evt.preventDefault();
    doLogout();
  };

  return (
    <>
      {/* Navbar primary */}
      <Navbar className="navbar-horizontal navbar-dark bg-primary" expand="lg">
        <Container>
          <span onClick={(e) => e.preventDefault()}>
            <Link className="navbar-brand" to="/home">
              <b>Library For All</b>
            </Link>
          </span>
          <button
            aria-controls="navbar-primary"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-primary"
            data-toggle="collapse"
            id="navbar-primary"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-primary">
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/home">
                    <img alt="..." src={require("assets/img/brand/lfa.png")} />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-primary"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-primary"
                    data-toggle="collapse"
                    id="navbar-primary"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-lg-auto" navbar>
              <NavItem>
                <NavLink to="/home" tag={Link}>
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="ptrCursor" onClick={(e) => handleLogout(e)}>
                  Logout
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://libraryforall.org/make-contact/"
                  target="_blank"
                >
                  Contact Us
                </NavLink>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default DemoNavbar;
