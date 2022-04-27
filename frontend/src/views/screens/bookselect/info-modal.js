import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Modal, Form, FormGroup, Label, Input } from "reactstrap";

const InfoModal = forwardRef((props, ref) => {
  const [infoModal, SetInfoModal] = useState(false);
  const [tranLangValue, SetTranLangValue] = useState({});
  const userTypeValue = props.userTypeValue;

  const toggleModal = () => {
    SetInfoModal(!infoModal);
  };

  const showModal = () => {
    SetInfoModal(true);
  };
  useImperativeHandle(ref, () => {
    return {
      showModal: showModal,
    };
  });

  const checkVal = () => {
    if (document.getElementById("langSelect").selectedIndex != 0) {
      document.getElementById("proceedBtn").classList.remove("disabledLink");
      let options = document.getElementById("langSelect").options;
      let id = options[options.selectedIndex].id;
      let value = document.getElementById("langSelect").value;
      SetTranLangValue({ id: id, value: value });
    } else {
      document.getElementById("proceedBtn").classList.add("disabledLink");
    }
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={infoModal}
      toggle={() => toggleModal("infoModal")}
    >
      <div className="modal-header">
        <h6 className="modal-title" id="modal-title-default">
          Community Guidelines!
        </h6>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => toggleModal("infoModal")}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <p>
          Library For All’s free digital and print library contains hundreds of
          expertly curated books with stories and pictures sourced from authors
          and illustrators around the world. Our approach is whole of language
          learning, specifically created to meet the needs of children in
          destinations where history, poverty or remoteness limit the
          community’s ability to access quality reading material. Books are both
          culturally relevant and age appropriate providing children with
          stories and themes they can readily understand and engage with.
        </p>
        <p>
          Our library serves a unique, curated collection of engaging content
          created by our international publishing team. We work tirelessly to
          publish children’s books that are high quality, age appropriate and
          culturally relevant for the communities that we serve. It’s critically
          important that children have access to books with stories, settings
          and characters they can relate to. After all, you cannot be what you
          cannot see.
        </p>
        <Form>
          <FormGroup>
            <Label for="exampleSelect">I'm Ready to proceed In:</Label>
            <Input
              type="select"
              name="select"
              id="langSelect"
              onChange={checkVal}
            >
              <option id="def">Select a Language to Continue...</option>
              {props.bookDetails
                ? Object.keys(props.bookDetails.translationsRequiredIn).map(
                    (key) => (
                      <option
                        key={key}
                        id={props.bookDetails.translationsRequiredIn[key].id}
                      >
                        {props.bookDetails.translationsRequiredIn[key].value}
                      </option>
                    )
                  )
                : null}
            </Input>
          </FormGroup>
        </Form>
      </div>
      <div className="modal-footer">
        <Link
          to={{
            pathname: "/editbook",
            state: {
              bookData: props.bookDetails,
              selectedLanguage: tranLangValue,
              userTypeValue: userTypeValue,
            },
          }}
          className="btn btn-primary disabledLink"
          id="proceedBtn"
        >
          Proceed
        </Link>
        <Button
          className="ml-auto"
          color="link"
          data-dismiss="modal"
          type="button"
          onClick={() => toggleModal("infoModal")}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
});

export default InfoModal;
