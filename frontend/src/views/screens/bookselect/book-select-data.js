import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Badge, Modal, Spinner } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import ViewPdf from "../../../components/viewPdfs/viewPdf.js";
import InfoModal from "./info-modal.js";
import { BOOK_STATUS } from "../../../environment/constants";

const BookSelectionData = (props) => {
  const userTypeValue = props.userTypeValue;
  let columnData = [];
  function onCellClicked(event) {
    setRowData(event.data);
  }
  const { loading, booksData, error } = props;
  const ref = useRef(null);
  const [selectedLang, SetSelectedLang] = useState("");

  const [pdfModalState, SetpdfModalState] = useState(false);
  const [bookpath, setBookpath] = useState("");
  const [rowData, setRowData] = useState("");
  const togglePdfModal = (param) => {
    SetpdfModalState(!pdfModalState);
    setBookpath(param);
  };

  const handleClick = () => {
    SetSelectedLang("english");
    ref.current.showModal();
  };

  const transColumns = [
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
      headerName: "Translations Required In",
      field: "translationsRequiredIn",
      width: 250,
      resizable: true,
      cellClass: ["fontsize14", ""],
      cellRendererFramework: (params) => {
        return Object.keys(params.value).map((key) => (
          <Badge key={key} color="primary" pill>
            {params.value[key].value}
          </Badge>
        ));
      },
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
      headerName: "Action",
      field: "",
      cellClass: "fontsize14",
      cellRendererFramework: (params) => {
        return (
          <Button color="success" size="sm" type="button" onClick={handleClick}>
            Translate
          </Button>
        );
      },
    },
  ];

  const reviewColums = [
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
      headerName: "Review Required In",
      field: "translationsRequiredIn",
      width: 250,
      resizable: true,
      cellClass: ["fontsize14", ""],
      cellRendererFramework: (params) => {
        return Object.keys(params.value).map((key) => (
          <Badge key={key} color="primary" pill>
            {params.value[key].value}
          </Badge>
        ));
      },
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
      headerName: "Action",
      field: "",
      cellClass: "fontsize14",
      cellRendererFramework: (params) => {
        return (
          <Button color="success" size="sm" type="button" onClick={handleClick}>
            Review
          </Button>
        );
      },
    },
  ];

  const lccolumns = [
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
      headerName: "Translated & Reviewed In",
      field: "translationsRequiredIn",
      width: 250,
      resizable: true,
      cellClass: ["fontsize14", ""],
      cellRendererFramework: (params) => {
        return Object.keys(params.value).map((key) => (
          <Badge key={key} color="primary" pill>
            {params.value[key].value}
          </Badge>
        ));
      },
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
      headerName: "Action",
      field: "",
      cellClass: "fontsize14",
      cellRendererFramework: (params) => {
        return (
          <Button color="success" size="sm" type="button" onClick={handleClick}>
            Publish
          </Button>
        );
      },
    },
  ];

  props.bookStatus == BOOK_STATUS.Available
    ? (columnData = [...transColumns])
    : props.bookStatus == BOOK_STATUS.TranCompleted
    ? (columnData = [...reviewColums])
    : props.bookStatus == BOOK_STATUS.RevComplted
    ? (columnData = [...lccolumns])
    : (columnData = [...lccolumns]);

  if (loading) {
    return <Spinner type="grow" color="info" className="spinner" />;
  }

  if (error) {
    return (
      <p className="pd_lt_10">
        You have no books for actions under this section. Please try again
        later.
      </p>
    );
  } else {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col className="pad_20">
              <div
                className="ag-theme-balham"
                style={{ height: "100%", width: "100%" }}
              >
                <AgGridReact
                  columnDefs={columnData}
                  rowData={booksData}
                  pagination={true}
                  domLayout="autoHeight"
                  onGridReady={(params) => {
                    params.api.sizeColumnsToFit();
                    params.api.resetRowHeights();
                  }}
                  //onRowClicked={(params) => onRowClicked(params)}
                  onCellClicked={(params) => onCellClicked(params)}
                  paginationPageSize={7}
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
        <InfoModal
          ref={ref}
          bookDetails={rowData}
          translationSelected={selectedLang}
          userTypeValue={userTypeValue}
        />
      </div>
    );
  }
};

export default BookSelectionData;
