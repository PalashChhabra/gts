import apiurls from "../../../environment/environment.js";
import { useState, useEffect } from "react";

function getInProgressData(langID, bookID) {
  try {
    let url = `${apiurls.getInProgressDataApi}?langId=${langID}&bookId=${bookID}`;

    return fetch(url).then((response) => {
      if (response.ok) {
        return response.text();
      } else if (response.status == 403) {
        throw new Error("Session Invalid");
      }
    });
  } catch (error) {
    console.log("session Invalid");
  }
}

export function useInProgressData(langID, bookID) {
  //custom hook to set data
  const [contentloading, setContentLoading] = useState(true);
  const [contentData, setContentData] = useState("");
  const [loaderror, setLoaderror] = useState(null);

  useEffect(() => {
    //useEffect hook to fetch all industry type for dropdown display
    getInProgressData(langID, bookID)
      .then((html) => {
        setContentData(html);
        setLoaderror(false);
        setContentLoading(false);
      })
      .catch((e) => {
        setLoaderror(e);
        setContentLoading(false);
      });
  }, []);

  return { contentData, contentloading, loaderror };
}
