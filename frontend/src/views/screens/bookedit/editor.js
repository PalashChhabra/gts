import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Container, Row, Col, Modal } from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import apiurls from "../../../environment/environment.js";
import { useInProgressData } from "./api-call.js";
import { Spinner } from "reactstrap";
import { USER_TYPES, BOOK_STATUS } from "../../../environment/constants";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

import axios from "axios";

const EditorComp = (props) => {
  const { history } = props;
  const bookData = props.bookData;
  const { userTypeValue } = props;
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loadingState, setLoadingState] = useState(false);

  let langID = Number(props.selectedLanguage.id);
  let bookID = props.bookData.docId;

  const { contentData, contentloading, loaderror } = useInProgressData(
    langID,
    bookID
  );

  const [saveModalState, SetsaveModalState] = useState(false);
  const [rejectModalState, SetRejectModalState] = useState(false);
  const [publishModalState, SetpublishModalState] = useState(false);

  const saveTranslation = async (LangID, BookID, Content = "") => {
    let url = apiurls.savetranslationApi;
    const request = {
      langId: LangID,
      bookId: BookID,
      content: Content,
    };
    setLoadingState(true);
    try {
      const result = await axios.post(url, request).then((res) => {
        if (res.status != 200) {
          setError("Something Went Wrong!");
        }
        if (res.status == 403) {
          history.push("/authError");
        }
        setData(res.data);
        SetsaveModalState(!saveModalState);
      });
    } catch (error) {
      setError("Something Went Wrong");
    }
    setLoadingState(false);
  };

  const publishTranslation = async (LangID, BookID, Content = "") => {
    let url = apiurls.publishBookContentAPI;
    const request = {
      langId: LangID,
      bookId: BookID,
      content: Content,
    };
    setLoadingState(true);
    try {
      const result = await axios.post(url, request).then((res) => {
        if (res.status != 200) {
          setError("Something Went Wrong!");
        }
        if (res.status == 403) {
          history.push("/authError");
        }
        setData(res.data);
        SetpublishModalState(!publishModalState);
      });
    } catch (error) {
      setError("Something Went Wrong");
    }
    setLoadingState(false);
  };

  const rejectTranslation = async (LangID, BookID) => {
    let url = apiurls.rejectTranslationApi;
    const request = {
      langId: LangID,
      bookId: BookID,
    };
    setLoadingState(true);
    try {
      const result = await axios.post(url, request).then((res) => {
        if (res.status != 200) {
          setError("Something Went Wrong!");
        }
        if (res.status == 403) {
          history.push("/authError");
        }
        setData(res.data);
        SetRejectModalState(!rejectModalState);
      });
    } catch (error) {
      setError("Something Went Wrong");
    }
    setLoadingState(false);
  };

  const publishContent = () => {
    SetpublishModalState(!publishModalState);
  };

  if (loaderror && loaderror.message == "Session Invalid") {
    history.push("/authError");
  }
  const toggleSaveModal = () => {
    SetsaveModalState(!saveModalState);
  };

  const togglePublishModal = () => {
    SetpublishModalState(!publishModalState);
  };

  const toggleRejectModal = () => {
    SetRejectModalState(!rejectModalState);
  };

  const [editBookContent, SeteditBookContent] = useState(contentData);

  useEffect(() => {
    SeteditBookContent(contentData);
  }, [contentData]);

  const [loadingSpinner, setLoadingSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingSpinner(false);
    }, 2000);
  }, []);

  const saveContent = (langID, bookID, editBookContent) => {
    saveTranslation(langID, bookID, editBookContent);
  };
  if (loadingSpinner) {
    return <Spinner type="grow" color="info" className="spinner" />;
  } else if (contentloading) {
    return <p>Loading...</p>;
  } else if ((error && error.length) || loaderror) {
    return <p>`ERROR OCCURED : {error}`</p>;
  } else {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              {!loadingState ? (
                <Button
                  color="success"
                  className="floatRT"
                  size="md"
                  type="button"
                  id="savebtn"
                  onClick={(e) => saveContent(langID, bookID, editBookContent)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  color="success"
                  className="floatRT"
                  size="md"
                  type="button"
                  disabled={true}
                  id="savebtn"
                >
                  Saving In Progress
                </Button>
              )}
              <h6 className="inlineDisplay">Share Progress:</h6>
              <FacebookShareButton
                className="pd_15"
                url="https://libraryforall.org"
                quote={`Hi! I am Translating a book named ${bookData.bookTitle} in ${props.selectedLanguage.value} through Library For All's translation platform. Head over to watch my progress!`}
              >
                <FacebookIcon size={42} round />
              </FacebookShareButton>
              <WhatsappShareButton
                className=""
                url="https://libraryforall.org/"
                title={`Hi! I am Translating a book named ${bookData.bookTitle} in ${props.selectedLanguage.value} through Library For All. Head over to watch my progress!`}
              >
                <WhatsappIcon size={42} round />
              </WhatsappShareButton>
              <TwitterShareButton
                className="pd_15"
                url="https://twitter.com/libraryforall"
                title={`Hi! I am Translating a book named ${bookData.bookTitle} in ${props.selectedLanguage.value} through Library For All. Head over to watch my progress!`}
                hashtags={["LibraryForAll", "GTS"]}
                related={["https://libraryforall.org/"]}
              >
                <TwitterIcon size={42} round />
              </TwitterShareButton>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <div className="document-editor">
                <Editor
                  apiKey={apiurls.tinyMCE_Editor_APIKey}
                  initialValue={contentData}
                  id="bookeditor"
                  init={{
                    setup: (editor) => (editor = editor),
                    height: 600,
                    selector: "textarea",
                    menubar: true,
                    plugins: [
                      "advlist autolink lists link image",
                      "print preview anchor help",
                      "searchreplace code",
                      "insertdatetime table paste wordcount",
                      "autosave",
                      "code",
                    ],
                    skin: "fabric",
                    content_css: "document",
                    toolbar:
                      "undo redo |restoredraft| formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help | save | code",
                  }}
                  onChange={(e) => SeteditBookContent(e.target.getContent())}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              {userTypeValue == USER_TYPES.TL ? (
                <Button
                  color="warning"
                  className="floatRT"
                  size="md"
                  type="button"
                  onClick={(e) =>
                    publishTranslation(langID, bookID, editBookContent)
                  }
                >
                  Submit for Review!
                </Button>
              ) : userTypeValue == USER_TYPES.RW ? (
                bookData.status == BOOK_STATUS.Available ||
                bookData.status == BOOK_STATUS.TransInProgress ? (
                  <Button
                    color="primary"
                    className="floatRT"
                    size="md"
                    type="button"
                    onClick={(e) =>
                      publishTranslation(langID, bookID, editBookContent)
                    }
                  >
                    Submit for Review!
                  </Button>
                ) : (
                  <>
                    <Button
                      color="warning"
                      className=""
                      size="md"
                      type="button"
                      onClick={(e) => rejectTranslation(langID, bookID)}
                    >
                      Reject Translation
                    </Button>
                    <Button
                      color="primary"
                      className="floatRT"
                      size="md"
                      type="button"
                      onClick={(e) =>
                        publishTranslation(langID, bookID, editBookContent)
                      }
                    >
                      Mark Review as Complete!
                    </Button>
                  </>
                )
              ) : userTypeValue == USER_TYPES.LC ? (
                <>
                  <Button
                    color="warning"
                    className=""
                    size="md"
                    type="button"
                    onClick={(e) => rejectTranslation(langID, bookID)}
                  >
                    Reject Translation
                  </Button>
                  <Button
                    color="primary"
                    className="floatRT"
                    size="md"
                    type="button"
                    onClick={(e) =>
                      publishTranslation(langID, bookID, editBookContent)
                    }
                  >
                    Publish Book!
                  </Button>
                </>
              ) : null}
            </Col>
          </Row>
        </Container>
        <Modal
          className="modal-dialog-centered"
          isOpen={saveModalState}
          toggle={() => toggleSaveModal("saveModal")}
        >
          <div className="modal-header">
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleSaveModal("saveModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body pad-top-0 text-center">
            <p>Congrats! Your changes have been saved.</p>
          </div>
          <div className="modal-footer">
            <Button color="success" to="/home" tag={Link}>
              Go to Dashboard
            </Button>
            <Button
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleSaveModal("saveModal")}
            >
              Close
            </Button>
          </div>
        </Modal>

        <Modal
          className="modal-dialog-centered modal-danger"
          contentClassName="bg-gradient-danger"
          isOpen={rejectModalState}
          toggle={() => toggleRejectModal("rejectModal")}
        >
          <div className="modal-header">
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => toggleRejectModal("rejectModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body pad-top-0 text-center">
            <p>
              Update! The current translation has been discarded and the book is
              available for translation again.
            </p>
          </div>
          <div className="modal-footer">
            <Button className="btn-white" color="default" to="/home" tag={Link}>
              Go to Dashboard
            </Button>
          </div>
        </Modal>

        <Modal
          className="modal-dialog-centered modal-danger"
          contentClassName="bg-gradient-danger"
          isOpen={publishModalState}
          toggle={() => togglePublishModal("publishModal")}
        >
          <div className="modal-header"></div>
          <div className="modal-body pad-top-0 text-center">
            {bookData.status == BOOK_STATUS.Available ||
            bookData.status == BOOK_STATUS.TransInProgress ? (
              <p>
                Congrats! Your Book {props.bookData.bookTitle} in{" "}
                {props.selectedLanguage.value} is sent for review!
              </p>
            ) : bookData.status == BOOK_STATUS.TranCompleted ||
              bookData.status == BOOK_STATUS.InReview ? (
              <p>
                Congrats! The book {props.bookData.bookTitle} you reviewed in{" "}
                {props.selectedLanguage.value} is sent for language check!
              </p>
            ) : bookData.status ==
              BOOK_STATUS.RevComplted /* TO CHANGE SOON,)*/ ? (
              <p>
                Congrats! The book {props.bookData.bookTitle} you language
                checked in {props.selectedLanguage.value} is marked as ready for
                publishing!
              </p>
            ) : null}
          </div>
          <div className="modal-footer">
            <Button className="btn-white" color="default" to="/home" tag={Link}>
              Go to Dashboard
            </Button>
          </div>
        </Modal>
      </>
    );
  }
};

export default EditorComp;
