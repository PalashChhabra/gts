import React from "react";
import TranslatorActions from "./translator-actions";
import ReviewerActions from "./reviewer-actions";
import LangCordActions from "./lancord-actions";
import { USER_TYPES } from "../../../environment/constants";

const UserActionsSection = (props) => {
  const userData = props.userData;

  switch (userData.usertypeValue) {
    case USER_TYPES.TL: {
      return <TranslatorActions userData={userData} />;
    }
    case USER_TYPES.RW: {
      return <ReviewerActions userData={userData} />;
    }
    case USER_TYPES.LC: {
      return <LangCordActions userData={userData} />;
    }
    default:
      return (
        <p>
          SEGMENT UNDER DEVELOPMENT. NO ACTIONS TO SHOW RIGHT NOW FOR THIS USER
          TYPE. PLEASE TRY AGAIN.
        </p>
      );
  }
};

export default UserActionsSection;
