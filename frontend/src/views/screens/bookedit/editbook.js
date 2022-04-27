import React, { useState } from "react";
import ViewPdf from "../../../components/viewPdfs/viewPdf.js";
// reactstrap components
import { Card, CardHeader, Container, Row, CardBody, Col } from "reactstrap";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import EditorComp from "./editor.js";
import { USER_TYPES, BOOK_STATUS } from "../../../environment/constants";

const EditBook = (props) => {
  const { userTypeValue } = props.location.state;
  const { bookData } = props.location.state;
  const { history } = props;
  const { selectedLanguage } = props.location.state;

  return (
    <>
      <DemoNavbar history={history} />
      <main>
        <div className="position-relative">
          {/* shape Hero */}
          <section className="section section-shaped">
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
                        <h4 className="mb-0">
                          You are now translating "
                          <strong>{bookData.bookTitle}</strong>" in
                          <strong> {selectedLanguage.value}</strong>.
                        </h4>
                      ) : userTypeValue == USER_TYPES.RW ? (
                        bookData.status == BOOK_STATUS.Available ||
                        bookData.status == BOOK_STATUS.TransInProgress ? (
                          <h4 className="mb-0">
                            You are now translating "
                            <strong>{bookData.bookTitle}</strong>" in
                            <strong> {selectedLanguage.value}</strong>.
                          </h4>
                        ) : (
                          <h4 className="mb-0">
                            You are now reviewing "
                            <strong>{bookData.bookTitle}</strong>" in
                            <strong> {selectedLanguage.value}</strong>.
                          </h4>
                        )
                      ) : userTypeValue == USER_TYPES.LC ? (
                        <h4 className="mb-0">
                          You are now reviewing "
                          <strong>{bookData.bookTitle}</strong>" in
                          <strong> {selectedLanguage.value}</strong>.
                        </h4>
                      ) : null}
                    </CardHeader>
                    <CardBody className="minHT">
                      <Container fluid>
                        <Row>
                          <Col lg="3">
                            {" "}
                            <ViewPdf docPath={bookData.docUrl} />
                          </Col>
                          <Col>
                            <EditorComp
                              bookData={bookData}
                              bookTitle={bookData.bookTitle}
                              selectedLanguage={selectedLanguage}
                              history={history}
                              userTypeValue={userTypeValue}
                            />
                          </Col>
                        </Row>
                      </Container>
                    </CardBody>
                  </Card>
                </div>
              </Row>
            </Container>
          </section>
        </div>
      </main>
      <SimpleFooter />
    </>
  );
};

export default EditBook;
