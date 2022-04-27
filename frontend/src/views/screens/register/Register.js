import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import Select from "react-select";
import countryList from "react-select-country-list";
import CreatableSelect from "react-select/creatable";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import { LANGUAGE_OPTIONS } from "../../../environment/constants";
import apiurls from "../../../environment/environment.js";

// Be sure to include styles at some point, probably during your bootstrapping
// reactstrap components
import {
  Button,
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
  Modal,
} from "reactstrap";

// core components
import SimpleFooter from "components/Footers/SimpleFooter.js";

const Register = (props) => {
  Cookies.remove("user_sid");
  const [userRegisterInfo, SetUserRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    location: "",
    language: [],
    email: "",
    password: "",
    userTypeId: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ispolicyActive, setIsPolicyActive] = useState(false);
  const [regModalState, SetregModalState] = useState(false);
  const userTypeOptions = [
    { value: 1, label: "Translator" },
    { value: 2, label: "Reviewer" },
    { value: 3, label: "Language Coordinator" },
  ];

  const handleCheck = (event) => {
    if (event.target.checked) {
      setIsPolicyActive(true);
    } else {
      setIsPolicyActive(false);
    }
  };
  const toggleRegModal = () => {
    SetregModalState(!regModalState);
  };

  const doRegister = async (userRegisterInfo) => {
    //create language string
    let languageSpoken = "";
    languageSpoken = Object.keys(userRegisterInfo.language)
      .map(function (k) {
        return userRegisterInfo.language[k].value;
      })
      .join(",");
    setLoading(true);
    try {
      const data = await axios
        .post(apiurls.registerApi, {
          firstName: userRegisterInfo.firstName,
          lastName: userRegisterInfo.lastName,
          age: userRegisterInfo.age,
          location: userRegisterInfo.location.label,
          language: languageSpoken,
          email: userRegisterInfo.email,
          password: userRegisterInfo.password,
          userTypeId: userRegisterInfo.userTypeId.value,
        })
        .then((res) => {
          if (res.status != 200) {
            setError(error.message);
          }
          SetregModalState(!regModalState);
        });
    } catch (error) {
      setError("Error While Creating User");
    }
    setLoading(false);
  };
  return (
    <>
      <main>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
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
                      <small>Sign up with credentials</small>
                    </div>
                    <Form role="form">
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="First Name"
                            type="text"
                            onChange={(e) => (
                              SetUserRegisterInfo({
                                ...userRegisterInfo,
                                firstName: e.target.value,
                              }),
                              setError("")
                            )}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-hat-3" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Last Name"
                            type="text"
                            onChange={(e) => (
                              SetUserRegisterInfo({
                                ...userRegisterInfo,
                                lastName: e.target.value,
                              }),
                              setError("")
                            )}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            onChange={(e) => (
                              SetUserRegisterInfo({
                                ...userRegisterInfo,
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
                            onChange={(e) => (
                              SetUserRegisterInfo({
                                ...userRegisterInfo,
                                password: e.target.value,
                              }),
                              setError("")
                            )}
                          />
                        </InputGroup>
                      </FormGroup>
                      <div className="text-muted font-italic">
                        <small>
                          <PasswordStrengthBar
                            minLength={3}
                            password={userRegisterInfo.password}
                          />
                        </small>
                      </div>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-user-run" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Age"
                            type="number"
                            min={16}
                            value={userRegisterInfo.age}
                            onChange={(e) => (
                              SetUserRegisterInfo({
                                ...userRegisterInfo,
                                age: e.target.value,
                              }),
                              setError("")
                            )}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <CreatableSelect
                          value={userRegisterInfo.language}
                          onChange={(e) => (
                            SetUserRegisterInfo({
                              ...userRegisterInfo,
                              language: e,
                            }),
                            setError("")
                          )}
                          options={LANGUAGE_OPTIONS}
                          isMulti
                          isSearchable
                          closeMenuOnSelect={false}
                          placeholder="Languages you Speak"
                        />
                      </FormGroup>
                      <FormGroup>
                        {" "}
                        <Select
                          options={countryList().getData()}
                          value={userRegisterInfo.country}
                          onChange={(e) => (
                            SetUserRegisterInfo({
                              ...userRegisterInfo,
                              location: e,
                            }),
                            setError("")
                          )}
                          isSearchable
                          placeholder="Select a Country"
                        />
                      </FormGroup>
                      <FormGroup>
                        {" "}
                        <Select
                          options={userTypeOptions}
                          value={userRegisterInfo.userTypeId}
                          onChange={(e) => (
                            SetUserRegisterInfo({
                              ...userRegisterInfo,
                              userTypeId: e,
                            }),
                            setError("")
                          )}
                          isSearchable
                          placeholder="I'm a.."
                        />
                      </FormGroup>
                      <Row className="my-4">
                        <Col xs="12">
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                              className="custom-control-input"
                              id="customCheckRegister"
                              type="checkbox"
                              onChange={(event) => handleCheck(event)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheckRegister"
                            >
                              <span>
                                I agree with the{" "}
                                <a
                                  href="#pablo"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Privacy Policy
                                </a>
                              </span>
                            </label>
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        {!loading ? (
                          <Button
                            color="primary"
                            className="mt-4"
                            type="button"
                            disabled={!ispolicyActive}
                            onClick={(e) => doRegister(userRegisterInfo)}
                          >
                            Create account
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            className="mt-4"
                            type="button"
                            disabled={true}
                          >
                            Please Wait..
                          </Button>
                        )}
                      </div>
                    </Form>
                    <Row className="mt-3">
                      <Col xs="6"></Col>
                      <Col className="text-right" xs="6">
                        <Link to="/login">
                          <small>Login</small>
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
      <Modal
        className="modal-dialog-centered"
        isOpen={regModalState}
        toggle={() => toggleRegModal("regModal")}
        backdrop="static"
      >
        <div className="modal-header">
          <h4>Welcome {userRegisterInfo.firstName} !</h4>
        </div>
        <div className="modal-body pad-top-0 text-center">
          <p>We're glad to make you a part of our community!</p>
          <p>Let's get started by logging in.</p>
        </div>
        <div className="modal-footer">
          <Button color="success" to="/login" tag={Link}>
            Login
          </Button>
        </div>
      </Modal>
      <SimpleFooter />
    </>
  );
};

export default Register;
