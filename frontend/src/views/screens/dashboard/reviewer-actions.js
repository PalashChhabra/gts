import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BOOK_STATUS } from "../../../environment/constants";

// reactstrap components
import { Button, Card, CardBody, Container, Row, Col, Modal } from "reactstrap";

const ReviewerActions = (props) => {
  const userData = props.userData;

  const [chooseActionState, SetchooseActionState] = useState(false);

  const toggleActionModal = () => {
    SetchooseActionState(!chooseActionState);
  };

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
                        Review or Translate a Book!
                      </h6>
                      <p className="description mt-3">
                        View books available for translation or review a
                        translated book.
                      </p>
                      <Button
                        className="mt-4"
                        color="primary"
                        onClick={(e) => toggleActionModal()}
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
                        Resume Last Progress
                      </h6>
                      <p className="description mt-3">
                        Continue with your last book translation or review in
                        progress.
                      </p>
                      <Button
                        className="mt-4"
                        color="success"
                        to={{
                          pathname: "/inProgress",
                          state: {
                            bookStatus: `${BOOK_STATUS.TransInProgress},${BOOK_STATUS.InReview}`,
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
        <Modal
          className="modal-dialog-centered"
          isOpen={chooseActionState}
          toggle={() => toggleActionModal("actionModal")}
        >
          <div className="modal-header">
            <h5>Choose an Action!</h5>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleActionModal("actionModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body text-center">
            <p>
              What would you like to do today. Choose either to translate a book
              or review a translation.
            </p>
          </div>
          <div className="modal-footer spacebtwn">
            <Button
              color="success"
              data-dismiss="modal"
              type="button"
              tag={Link}
              to={{
                pathname: "/bookselection",
                state: {
                  bookStatus: BOOK_STATUS.Available,
                  userTypeValue: userData.usertypeValue,
                },
              }}
            >
              Translate a Book
            </Button>
            <Button
              color="warning"
              data-dismiss="modal"
              type="button"
              tag={Link}
              to={{
                pathname: "/bookselection",
                state: {
                  bookStatus: BOOK_STATUS.TranCompleted,
                  userTypeValue: userData.usertypeValue,
                },
              }}
            >
              Review a Book
            </Button>
          </div>
        </Modal>
      </section>
    </>
  );
};

export default ReviewerActions;
