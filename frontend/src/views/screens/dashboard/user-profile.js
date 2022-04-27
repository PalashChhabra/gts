import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col, Progress } from "reactstrap";
import { USER_TYPES } from "../../../environment/constants";

const UserProfile = (props) => {
  const userData = props.userData;
  const avatar = "../../../src/assets/img/icons/common/person.png";
  return (
    <>
      <section className="section">
        <Container>
          <Card className="card-profile shadow">
            <div className="px-4">
              <Row className="justify-content-center">
                <Col className="order-lg-1" lg="6">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/icons/common/person.png")}
                      />
                    </a>
                  </div>
                </Col>
                <Col className="order-lg-2" lg="6">
                  <div className="card-profile-stats d-flex justify-content-center custom-float">
                    {userData.usertypeValue == USER_TYPES.TL ? (
                      <div>
                        <span className="heading">
                          {userData.translatedBooks}
                        </span>
                        <span className="description">
                          Translations Approved
                        </span>
                      </div>
                    ) : userData.usertypeValue == USER_TYPES.RW ? (
                      <>
                        <div>
                          <span className="heading">
                            {userData.translatedBooks}
                          </span>
                          <span className="description">
                            Translations Approved
                          </span>
                        </div>
                        <div>
                          <span className="heading">
                            {userData.reviewedBooks}
                          </span>
                          <span className="description">Reviews Approved</span>
                        </div>
                      </>
                    ) : userData.usertypeValue == USER_TYPES.LC ? (
                      <div>
                        <span className="heading">
                          {userData.publishedBooks}
                        </span>
                        <span className="description">Books Published</span>
                      </div>
                    ) : (
                      <h6>User Role Not Defined</h6>
                    )}
                    <div>
                      <span className="heading">{userData.awardPoints}</span>
                      <span className="description">Award Points</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="6"></Col>
                {userData.usertypeValue == USER_TYPES.LC ? (
                  <Col className="order-lg-2" lg="6">
                    <div className="card-profile-stats d-flex justify-content-center custom-float custom-set">
                      <div className="progress-wrapper">
                        <div className="progress-info">
                          <div className="progress-percentage">
                            <span>
                              You're a top level contributor.
                              <i className="ni ni-trophy" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                ) : (
                  <Col className="order-lg-2" lg="6">
                    <div className="card-profile-stats d-flex justify-content-center custom-float custom-set">
                      <div className="progress-wrapper">
                        <div className="progress-info">
                          <Progress
                            max={userData.maxPoints}
                            value={userData.awardPoints}
                            color="success"
                          />
                          <div className="progress-percentage">
                            <span>
                              Need{" "}
                              {parseInt(userData.maxPoints) -
                                parseInt(userData.awardPoints)}{" "}
                              more points to reach to next level.{" "}
                              <i className="ni ni-trophy" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
              <div className="text-center mt-5">
                {userData.usertypeValue == USER_TYPES.TL ? (
                  <h6>I'm a Translator</h6>
                ) : userData.usertypeValue == USER_TYPES.RW ? (
                  <h6>I'm a Reviewer</h6>
                ) : userData.usertypeValue == USER_TYPES.LC ? (
                  <h6>I'm a Language Coordinator</h6>
                ) : (
                  <h6>User Role Not Defined</h6>
                )}

                <h3>
                  {userData.firstName} {userData.lastName}
                  <span className="font-weight-light">, {userData.age}</span>
                </h3>
                <div className="h6 font-weight-300">
                  <i className="ni location_pin mr-2" />
                  {userData.location}
                </div>
                <div className="h6 mt-4">
                  <i className="ni business_briefcase-24 mr-2" />
                  Speaks {userData.language}
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
};

export default UserProfile;
