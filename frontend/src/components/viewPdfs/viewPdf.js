import React, { Component } from "react";
import { Button, Row, Col } from "reactstrap";
import { Document, Page } from "react-pdf/dist/entry.webpack";
const options = {
  workerSrc: `./pdfworker/pdf.min.js`,
};

export default class ViewPdf extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  };

  onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1,
    });
  };

  changePage = (offset) =>
    this.setState((prevState) => ({
      pageNumber: prevState.pageNumber + offset,
    }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { numPages, pageNumber } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col className="text-center pad-bottom-10">
            <Button
              color="primary"
              size="sm"
              type="button"
              disabled={pageNumber <= 1}
              onClick={this.previousPage}
            >
              Prev
            </Button>
            <Button
              color="primary"
              size="sm"
              disabled={pageNumber >= numPages}
              onClick={this.nextPage}
            >
              Next
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Document
              options={options}
              file={this.props.docPath}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
