import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import apiurls from "../../../environment/environment.js";
import ReactDOM from "react-dom";
import ErrorPage from "../errorpage/error";
import Cookies from "js-cookie";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";

// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";

const Login = (props) => {
  Cookies.remove("user_sid");
  const { history } = props;
  const [userLoginInfo, SetUserLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const doLogin = async () => {
    setLoading(true);
    try {
      const data = await axios
        .post(apiurls.loginApi, {
          username: userLoginInfo.email,
          password: userLoginInfo.password,
        })
        .then((res) => {
          if (res.status != 200) {
            setError(error.message);
          }
          history.push("/home");
        });
    } catch (error) {
      setError("User Name or Password is incorrect");
    }
    setLoading(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    doLogin();
  };

  return (
    <>
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-lg-custom section-shaped pb-250">
            <div className="shape shape-style-1 shape-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="py-lg-md d-flex">
              <div className="col px-0">
                <Row>
                  <Col lg="12">
                    <div className="icon-shape rounded-circle shadow icon-shape-custom">
                      <img
                        alt="..."
                        className="brand-logo-size"
                        src={require("assets/img/brand/lfa.png")}
                      />
                    </div>
                    <h1 className="display-3 text-white">
                      Global Translation System
                    </h1>
                    <p className="lead text-white">
                      A platform for our community of volunteers to help us
                      translate books in multiple languages!
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          {/* 1st Hero Variation */}
        </div>
        <section className="section bottom-margin-custom pt-lg-0 mt--200 loginScreen">
          <Container className="">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-white">
                    <div className="btn-wrapper text-center red-color">
                      <b>
                        {error ? <span>{error}</span> : <span>Welcome</span>}
                      </b>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Sign in with credentials</small>
                    </div>
                    <Form role="form" onSubmit={handleSubmit}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            value={userLoginInfo.email}
                            onChange={(e) => (
                              SetUserLoginInfo({
                                ...userLoginInfo,
                                email: e.target.value,
                              }),
                              setError("")
                            )}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            value={userLoginInfo.password}
                            onChange={(e) => (
                              SetUserLoginInfo({
                                ...userLoginInfo,
                                password: e.target.value,
                              }),
                              setError("")
                            )}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-center">
                        <input
                          type="submit"
                          className="btn btn-primary my-4"
                          value="Sign In"
                        />
                      </div>
                    </Form>
                    <Row className="mt-3">
                      <Col xs="6"></Col>
                      <Col className="text-right" xs="6">
                        <Link to="/register">
                          <small>Create new account</small>
                        </Link>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      <SimpleFooter />
    </>
  );
};

export default Login;
