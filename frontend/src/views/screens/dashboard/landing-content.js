import React from "react";

// reactstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  CardBody,
  CardImg,
} from "reactstrap";

import Ticker from "./animated-numbers";

const LandingContent = (props) => {
  return (
    <>
      <section className="section bg-secondary">
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6">
              <Card className="bg-default shadow border-0">
                <CardImg
                  alt="..."
                  src={require("assets/img/brand/LibraryForAllPoster.jpg")}
                  top
                />
                <blockquote className="card-blockquote">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-bg"
                    preserveAspectRatio="none"
                    viewBox="0 0 583 95"
                  >
                    <polygon
                      className="fill-default"
                      points="0,52 583,95 0,95"
                    />
                    <polygon
                      className="fill-default"
                      opacity=".2"
                      points="0,42 583,95 683,0 0,95"
                    />
                  </svg>
                  <h4 className="display-3 font-weight-bold text-white">
                    Make A Difference!
                  </h4>
                  <p className="lead text-italic text-white">
                    With your help 250,000 children are now reading with Library
                    For All.
                  </p>
                </blockquote>
              </Card>
            </Col>
            <Col md="6">
              <div className="pl-md-5">
                <div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                  <i className="ni ni-active-40" />
                </div>
                <h3>
                  Take action. <br />
                  Change the world.
                </h3>
                <p className="lead">
                  With your help, our vision of assisting 20 million children to
                  read with Library For All is achievable. You can contribute to
                  our literacy building programs through a one off or monthly
                  donation, or sponsor books or a Spark Digital Library Kit for
                  a school, and we will bring the joy of reading to hundreds of
                  children on your behalf. Or you can partner with us to deliver
                  major programs that develop new collections and help us expand
                  into more countries.
                </p>
                <a
                  className="font-weight-bold text-warning mt-5"
                  href="https://libraryforall.org/"
                  target="_blank"
                >
                  Know More About the Transformation!
                </a>
              </div>
            </Col>
          </Row>
          <Row className="mt-2rem">
            <Col md="4">
              <i className="size-3 pd-rt ni ni-books" />
              <Ticker
                className="size-3 displayInline count"
                end={1000}
                suffix="s"
              />
              <div>of original books</div>
            </Col>
            <Col md="4">
              <i className="size-3 pd-rt ni ni-ruler-pencil" />
              <Ticker
                className="size-3 displayInline count"
                end={100}
                suffix="s"
              />
              <div>translators around the globe</div>
            </Col>
            <Col md="4">
              <i className="size-3 pd-rt ni ni-hat-3" />
              <Ticker className="size-3 displayInline count" end={130000} />
              <div>people are now reading our library</div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section pb-0 bg-gradient-warning">
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-lg-2 ml-lg-auto" md="6">
              <div className="position-relative pl-md-5">
                <img
                  alt="..."
                  className="img-center img-fluid"
                  src={require("assets/img/brand/students1.png")}
                />
              </div>
            </Col>
            <Col className="order-lg-1 margin-top-0" lg="6">
              <Card className="shadow shadow-lg--hover mt-5">
                <CardBody>
                  <div className="d-flex px-3">
                    <div>
                      <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                        <i className="ni ni-single-copy-04 text-primary" />
                      </div>
                    </div>
                    <div className="pl-4">
                      <h5 className="title text-primary">
                        Becoming a Translator
                      </h5>
                      <p>
                        If you're proficient in multiple languages, help us
                        translate our content and achieve our vision of
                        assisting 20 million children to read with Library for
                        All.
                      </p>
                      <a
                        className="text-primary"
                        href="https://libraryforall.org/take-action/"
                        target="_blank"
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="shadow shadow-lg--hover mt-5">
                <CardBody>
                  <div className="d-flex px-3">
                    <div>
                      <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                        <i className="ni ni-badge" />
                      </div>
                    </div>
                    <div className="pl-4">
                      <h5 className="title text-success">
                        Becoming a Reviewer
                      </h5>
                      <p>
                        With experience, get promoted to becoming a reviewer and
                        validate translations to create high quality academic
                        content that helps us put books in the hands of millions
                        of children around the world.
                      </p>
                      <a
                        className="text-success"
                        href="https://libraryforall.org/"
                        target="_blank"
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="shadow shadow-lg--hover mt-5">
                <CardBody>
                  <div className="d-flex px-3">
                    <div>
                      <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                        <i className="ni ni-paper-diploma" />
                      </div>
                    </div>
                    <div className="pl-4">
                      <h5 className="title text-warning">
                        Becoming a Language Coordinator
                      </h5>
                      <p>
                        Take the journey of becoming the Master of Translations
                        with us and help us create culturally relevant, age
                        appropriate books in a language and context children
                        understand and relate to.
                      </p>
                      <a
                        className="text-warning"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Learn more
                      </a>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LandingContent;
