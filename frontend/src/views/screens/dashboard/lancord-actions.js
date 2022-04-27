import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";
import { BOOK_STATUS } from "../../../environment/constants";

const LangCordActions = (props) => {
  const userData = props.userData;

  return (
    <>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              <Row className="row-grid">
                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardBody className="py-5">
                      <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                        <i className="ni ni-collection" />
                      </div>
                      <h6 className="text-primary text-uppercase">
                        Review a Book!
                      </h6>
                      <p className="description mt-3">
                        View a list of Books that have been reviewed and are
                        available to publish.
                      </p>
                      <Button
                        className="mt-4"
                        color="primary"
                        tag={Link}
                        to={{
                          pathname: "/bookselection",
                          state: {
                            bookStatus: BOOK_STATUS.RevComplted,
                            userTypeValue: userData.usertypeValue,
                          },
                        }}
                      >
                        Get Started
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardBody className="py-5">
                      <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                        <i className="ni ni-ruler-pencil" />
                      </div>
                      <h6 className="text-success text-uppercase">
                        Resume Last Review
                      </h6>
                      <p className="description mt-3">
                        Continue with your last book review in progress.
                      </p>
                      <Button
                        className="mt-4"
                        color="success"
                        to={{
                          pathname: "/inProgress",
                          state: {
                            bookStatus: BOOK_STATUS["Publish In Progress"], // TO CHANGE SOON,
                            userTypeValue: userData.usertypeValue,
                          },
                        }}
                        tag={Link}
                      >
                        Continue
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="4">
                  <Card className="card-lift--hover shadow border-0">
                    <CardBody className="py-5">
                      <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                        <i className="ni ni-settings-gear-65" />
                      </div>
                      <h6 className="text-warning text-uppercase">
                        View Action History
                      </h6>
                      <p className="description mt-3">
                        See the current status of books and history of actions
                        performed.
                      </p>
                      <Button
                        className="mt-4"
                        color="warning"
                        to={{
                          pathname: "/history",
                          state: {
                            userTypeValue: userData.usertypeValue,
                          },
                        }}
                        tag={Link}
                      >
                        View
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LangCordActions;
