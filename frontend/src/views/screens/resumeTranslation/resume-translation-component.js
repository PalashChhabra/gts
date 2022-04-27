import React, { useState } from "react";
import { Container, Row, Card, CardHeader } from "reactstrap";
import { useTranslatedBooksData } from "./api-call.js";
import ResumeTranslationData from "./resume-translator-data.js";
import ResumeReviewerData from "./resume-reviewer-data.js";
import ResumeLCData from "./resume-lc-data.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { USER_TYPES } from "../../../environment/constants";

function ResumeTranslation(props) {
  const { bookStatus } = props.location.state;
  const { userTypeValue } = props.location.state;
  const { history } = props;
  const { loading, booksData, error } = useTranslatedBooksData(bookStatus);
  if (error && error.message == "Session Invalid") {
    history.push("/authError");
  }

  return (
    <div>
      <DemoNavbar history={history} />
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-shaped minHt">
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
            <Container className="pad-t-50" fluid>
              {/* Table */}
              <Row>
                <div className="col">
                  <Card className="shadow">
                    <CardHeader className="border-0">
                      {userTypeValue == USER_TYPES.TL ? (
                        <h3 className="mb-0">Translations in Progress</h3>
                      ) : userTypeValue == USER_TYPES.RW ? (
                        <h3 className="mb-0">
                          Your Translations and Reviews in Progress
                        </h3>
                      ) : userTypeValue == USER_TYPES.LC ? (
                        <h3 className="mb-0">Publications in Progress</h3>
                      ) : null}
                    </CardHeader>
                    {userTypeValue == USER_TYPES.TL ? (
                      <ResumeTranslationData
                        loading={loading}
                        booksData={booksData}
                        error={error}
                        userTypeValue={userTypeValue}
                      />
                    ) : userTypeValue == USER_TYPES.RW ? (
                      <h3 className="mb-0">
                        <ResumeReviewerData
                          loading={loading}
                          booksData={booksData}
                          error={error}
                          userTypeValue={userTypeValue}
                        />
                      </h3>
                    ) : userTypeValue == USER_TYPES.LC ? (
                      <h3 className="mb-0">
                        <ResumeLCData
                          loading={loading}
                          booksData={booksData}
                          error={error}
                          userTypeValue={userTypeValue}
                        />
                      </h3>
                    ) : null}
                  </Card>
                </div>
              </Row>
            </Container>
          </section>
        </div>
      </main>
      <SimpleFooter />
    </div>
  );
}

export default ResumeTranslation;
