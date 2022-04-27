/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer">
          <Container>
            <Row className=" row-grid align-items-center">
              <Col lg="7">
                <h3 className=" text-primary font-weight-light mb-2">
                  Thank you for being a part of our community!
                </h3>
              </Col>
              <Col className="text-lg-center btn-wrapper" lg="5">
                <Button
                  className="btn-icon-only rounded-circle"
                  color="twitter"
                  href="https://twitter.com/LibraryForAll"
                  id="tooltip475038074"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-twitter" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip475038074">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="facebook"
                  href="https://www.facebook.com/libraryforall/"
                  id="tooltip837440414"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-facebook-square" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip837440414">
                  Like us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="instagram"
                  href="https://www.instagram.com/libraryforall/"
                  id="tooltip829810202"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-instagram" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip829810202">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="linked-in"
                  href="https://www.linkedin.com/company/library-for-all/?originalSubdomain=au"
                  id="tooltip495507257"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-linkedin" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip495507257">
                  Connect with us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="youtube"
                  href="https://www.youtube.com/channel/UCkK398I-PBjizhd50Z5_UHg"
                  id="tooltip495507299"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-youtube" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip495507299">
                  Subscribe our channel
                </UncontrolledTooltip>
              </Col>
            </Row>
            <hr className="hr-custom" />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="12">
                <div className=" copyright">
                  © {new Date().getFullYear()}{" "}
                  <a
                    href="https://libraryforall.org/"
                    target="_blank"
                  >
                    Library For All
                  </a>
                  .
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
