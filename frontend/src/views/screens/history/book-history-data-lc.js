import React, { useState } from "react";
import { Container, Row, Col, Button, Badge, Modal, Spinner } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { BOOK_STATUS } from "../../../environment/constants.js";
import ViewPdf from "../../../components/viewPdfs/viewPdf.js";

import apiurls from "../../../environment/environment.js";
import axios from "axios";

const BookHistoryDataLC = (props) => {
  const userTypeValue = props.userTypeValue;
  const { history } = props;
  function onCellClicked(event) {
    setRowData(event.data);
  }
  const { loading, booksData, error } = props;
  const [rowData, setRowData] = useState();
  const [pdfModalState, SetpdfModalState] = useState(false);
  const [bookpath, setBookpath] = useState("");
  const togglePdfModal = (param) => {
    SetpdfModalState(!pdfModalState);
    setBookpath(param);
  };

  let reviewArray = [];
  if (booksData.length > 0) {
    reviewArray = booksData[0].publishingHistory;
  }

  const Reviewcolumns = [
    {
      headerName: "LFA ID",
      field: "lfaId",
      sortable: true,
      filter: true,
      cellClass: ["fontsize14"],
      width: 100,
    },
    {
      headerName: "Title",
      field: "bookTitle",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "fontsize14",
    },
    {
      headerName: "Original Language",
      field: "originalLanguage",
      filter: true,
      cellClass: "fontsize14",
    },
    {
      headerName: "Reviewed In",
      field: "translatedIn",
      resizable: true,
      cellClass: ["fontsize14", ""],
    },
    {
      headerName: "Approx. Length",
      field: "approxLength",
      sortable: true,
      filter: "agNumberColumnFilter",
      cellClass: "fontsize14",
    },
    {
      headerName: "Genre",
      field: "category",
      sortable: true,
      filter: true,
      cellClass: "fontsize14",
    },
    {
      headerName: "Meta Desc.",
      field: "metaDesc",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "fontsize14",
    },
    {
      headerName: "Keywords",
      field: "keywords",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "fontsize14",
    },
    {
      headerName: "Preview",
      field: "docUrl",
      cellClass: "fontsize14",
      //logic to pass stock code and name on click, Link element of router-dom is used to pass data
      cellRendererFramework: (params) => {
        return (
          <Button
            color="primary"
            size="sm"
            outline
            type="button"
            id={params.value}
            onClick={() => togglePdfModal(params.value)}
          >
            View
          </Button>
        );
      },
    },
    {
      headerName: "Current Status",
      field: "updatedstatus",
      sortable: true,
      filter: true,
      resizable: true,
      cellClass: "fontsize14",
    },
  ];

  if (loading) {
    return <Spinner type="grow" color="info" className="spinner" />;
  }

  if (error) {
    return (
      <p className="pd_lt_10">
        Sorry! You do not have any history to show for. Please select a book
        from home page and perform an action on a book to view book history
        here.
      </p>
    );
  } else {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col className="pad_20">
              <div>
                <h5>Reviews:</h5>
              </div>
              <div
                className="ag-theme-balham"
                style={{ height: "100%", width: "100%" }}
              >
                <AgGridReact
                  columnDefs={Reviewcolumns}
                  rowData={reviewArray}
                  pagination={true}
                  domLayout="autoHeight"
                  onGridReady={(params) => {
                    params.api.sizeColumnsToFit();
                    params.api.resetRowHeights();
                  }}
                  //onRowClicked={(params) => onRowClicked(params)}
                  onCellClicked={(params) => onCellClicked(params)}
                  paginationPageSize={9}
                  reactNext={true}
                  rowHeight={50}
                ></AgGridReact>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal
          className="modal-dialog-centered"
          isOpen={pdfModalState}
          toggle={() => togglePdfModal("exampleModal")}
        >
          <div className="modal-header">
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => togglePdfModal("exampleModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body pad-top-0 text-center">
            <ViewPdf docPath={bookpath} />
          </div>
          <div className="modal-footer">
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => togglePdfModal("exampleModal")}
            >
              Close
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
};

export default BookHistoryDataLC;
