import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Badge, Modal, Spinner } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { BOOK_STATUS } from "../../../environment/constants.js";

import apiurls from "../../../environment/environment.js";
import axios from "axios";

const ResumeReviewerData = (props) => {
  const userTypeValue = props.userTypeValue;
  const { history } = props;
  function onCellClicked(event) {
    setRowData(event.data);
  }
  const { loading, booksData, error } = props;
  const [rowData, setRowData] = useState();
  const [deleteData, setDeleteData] = useState();
  const [deleteEror, setDeleteError] = useState();
  const [deleteModalState, SetDeleteModalState] = useState(false);

  const toggleDeleteModal = () => {
    SetDeleteModalState(!deleteModalState);
  };

  let translationArray = booksData.filter((item) =>
    item.status.includes(BOOK_STATUS.TransInProgress)
  );

  let reviewArray = booksData.filter((item) =>
    item.status.includes(BOOK_STATUS.InReview)
  );

  const deleteTranslation = async (langId, bookId) => {
    //console.log(rowData);
    let url = apiurls.deleteTranslationApi;
    const request = {
      langId: langId,
      bookId: bookId,
    };
    try {
      const result = await axios.post(url, request).then((res) => {
        if (res.status != 200) {
          setDeleteError("Something Went Wrong!");
        } else if (res.status == 403) {
          history.push("/authError");
        }
        setDeleteData(res.data);
        SetDeleteModalState(!deleteModalState);
      });
    } catch (error) {
      setDeleteError("Something Went Wrong");
    }
  };

  const Transcolumns = [
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
      headerName: "Translating In",
      field: "translationIn",
      resizable: true,
      cellClass: ["fontsize14", ""],
      cellRendererFramework: (params) => {
        return (
          <Badge key={params.data.translationIn.id} color="primary" pill>
            {params.data.translationIn.value}
          </Badge>
        );
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
      headerName: "Action",
      field: "",
      cellClass: "fontsize14",
      cellRendererFramework: (params) => {
        return (
          <Link
            to={{
              pathname: "/editBook",
              state: {
                bookData: params.data,
                selectedLanguage: params.data.translationIn,
                userTypeValue: userTypeValue,
              },
            }}
            className="btn btn-success btn-sm"
            id="btn"
          >
            Resume
          </Link>
        );
      },
    },
    {
      headerName: "Release Book",
      field: "",
      cellClass: "fontsize14",
      cellRendererFramework: (params) => {
        return (
          <Button
            className="btn btn-warning btn-sm"
            id="btn"
            onClick={(e) =>
              deleteTranslation(params.data.translationIn.id, params.data.docId)
            }
          >
            Discard
          </Button>
        );
      },
    },
  ];

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
      headerName: "Reviewing In",
      field: "translationIn",
      resizable: true,
      cellClass: ["fontsize14", ""],
      cellRendererFramework: (params) => {
        return (
          <Badge key={params.data.translationIn.id} color="primary" pill>
            {params.data.translationIn.value}
          </Badge>
        );
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
      headerName: "Action",
      field: "",
      cellClass: "fontsize14",
      cellRendererFramework: (params) => {
        return (
          <Link
            to={{
              pathname: "/editBook",
              state: {
                bookData: params.data,
                selectedLanguage: params.data.translationIn,
                userTypeValue: userTypeValue,
              },
            }}
            className="btn btn-success btn-sm"
            id="btn"
          >
            Resume
          </Link>
        );
      },
    },
    {
      headerName: "Release Book",
      field: "",
      cellClass: "fontsize14",
      cellRendererFramework: (params) => {
        return (
          <Button
            className="btn btn-warning btn-sm"
            id="btn"
            onClick={(e) =>
              deleteTranslation(params.data.translationIn.id, params.data.docId)
            }
          >
            Discard
          </Button>
        );
      },
    },
  ];

  if (loading) {
    return <Spinner type="grow" color="info" className="spinner" />;
  }

  if (error) {
    return (
      <p className="pd_lt_10">
        Sorry! You do not have any saved progress from last time. Please select
        a book from home page to keep a track of your progress here.
      </p>
    );
  } else {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col className="pad_20 pdtp20">
              <div>
                <h5>Translations:</h5>
              </div>
              <div
                className="ag-theme-balham"
                style={{ height: "100%", width: "100%" }}
              >
                <AgGridReact
                  columnDefs={Transcolumns}
                  rowData={translationArray}
                  pagination={true}
                  domLayout="autoHeight"
                  onGridReady={(params) => {
                    params.api.sizeColumnsToFit();
                    params.api.resetRowHeights();
                  }}
                  //onRowClicked={(params) => onRowClicked(params)}
                  onCellClicked={(params) => onCellClicked(params)}
                  paginationPageSize={4}
                  reactNext={true}
                  rowHeight={50}
                ></AgGridReact>
              </div>
            </Col>
          </Row>
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
                  paginationPageSize={4}
                  reactNext={true}
                  rowHeight={50}
                ></AgGridReact>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal
          className="modal-dialog-centered"
          isOpen={deleteModalState}
          toggle={() => toggleDeleteModal("DeleteModal")}
          backdrop="static"
        >
          <div className="modal-header text-center">
            {rowData ? (
              <div>
                <h4>Discard Successful</h4>
              </div>
            ) : null}
          </div>
          <div className="modal-body text-center">
            <p>
              Discard Success! You won't be able to save any more changes to the
              version since the book has been released by you.
            </p>
          </div>
          <div className="modal-footer">
            <Button color="success" to="/home" tag={Link}>
              Go to Dashboard
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
};

export default ResumeReviewerData;
