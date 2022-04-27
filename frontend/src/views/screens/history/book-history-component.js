import React, { useState } from "react";
import { Container, Row, Card, CardHeader } from "reactstrap";
import { useBooksData } from "./api-call.js";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { USER_TYPES } from "../../../environment/constants";
import BookHistoryDataLC from "./book-history-data-lc.js";
import BookHistoryDataRW from "./book-history-data-reviewer.js";
import BookHistoryDataTL from "./book-history-data-translator.js";

function BookHistory(props) {
  const { userTypeValue } = props.location.state;
  const { history } = props;
  const { loading, booksData, error } = useBooksData(history);
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
                      <h3 className="mb-0">
                        Showing status history for books worked upon by you
                      </h3>
                    </CardHeader>
                    {userTypeValue == USER_TYPES.TL ? (
                      <BookHistoryDataTL
                        loading={loading}
                        booksData={booksData}
                        error={error}
                        userTypeValue={userTypeValue}
                      />
                    ) : userTypeValue == USER_TYPES.RW ? (
                      <BookHistoryDataRW
                        loading={loading}
                        booksData={booksData}
                        error={error}
                        userTypeValue={userTypeValue}
                      />
                    ) : userTypeValue == USER_TYPES.LC ? (
                      <BookHistoryDataLC
                        loading={loading}
                        booksData={booksData}
                        error={error}
                        userTypeValue={userTypeValue}
                      />
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

export default BookHistory;
