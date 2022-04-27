// reactstrap components
import { Container, Row, Col } from "reactstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import UserActionsSection from "./user-actions.js";
import UserProfile from "./user-profile.js";
import { Spinner } from "reactstrap";
import apiurls from "../../../environment/environment.js";
import LandingContent from "./landing-content.js";

const UserLanding = (props) => {
  const { history } = props;
  const [userInfo, SetUserInfo] = useState({
    firstName: null,
    lastName: null,
    age: null,
    location: null,
    language: null,
    usertypeValue: null,
    awardPoints: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userInfoFunction = async () => {
    setLoading(true);
    try {
      const data = await axios.get(apiurls.getUserDetails).then((res) => {
        if (res.status != 200) {
          setError(error.message);
        }
        if (res.status == 403) {
          history.push("/authError");
        }
        SetUserInfo({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          age: res.data.age,
          location: res.data.location,
          language: res.data.language,
          usertypeValue: res.data.usertypeValue,
          awardPoints: res.data.awardPoints,
          maxPoints: res.data.maxPoints,
          translatedBooks: res.data.translatedBooks,
          reviewedBooks: res.data.reviewedBooks,
          publishedBooks: res.data.publishedBooks,
        });
      });
    } catch (error) {
      if (error.response.status == 403) {
        history.push("/authError");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    userInfoFunction();
  }, []);

  if (!loading) {
    return (
      <>
        <DemoNavbar history={history} />
        <main className="profile-page">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
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
                      <h1 className="display-3 text-white">
                        Welcome {userInfo.firstName}!
                      </h1>
                      <p className="lead text-white">Let's Get Started.</p>
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
          <UserActionsSection userData={userInfo} />
          <UserProfile userData={userInfo} />
          <LandingContent />
          <SimpleFooter />
        </main>
      </>
    );
  } else if (loading) {
    return <Spinner type="grow" color="info" className="spinner" />;
  }
};

export default UserLanding;
