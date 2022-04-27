import React, { useState } from "react";
import { Container, Row, Card, CardHeader } from "reactstrap";
import { useBooksData } from "./api-call.js";
import BookSelectionData from "./book-select-data.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { BOOK_STATUS } from "../../../environment/constants";

function BookSelection(props) {
  const { userTypeValue } = props.location.state;
  const { history } = props;
  const { bookStatus } = props.location.state;
  const { loading, booksData, error } = useBooksData(bookStatus, history);
  console.log(error);
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
                      {bookStatus == BOOK_STATUS.Available ? (
                        <h3 className="mb-0">
                          Books Available for Translation
                        </h3>
                      ) : bookStatus == BOOK_STATUS.TranCompleted ? (
                        <h3 className="mb-0">Books Available for Review</h3>
                      ) : bookStatus == BOOK_STATUS.RevComplted ? (
                        <h3 className="mb-0">Books Available to Publish</h3>
                      ) : null}
                    </CardHeader>
                    <BookSelectionData
                      loading={loading}
                      booksData={booksData}
                      error={error}
                      bookStatus={bookStatus}
                      userTypeValue={userTypeValue}
                    />
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

export default BookSelection;
