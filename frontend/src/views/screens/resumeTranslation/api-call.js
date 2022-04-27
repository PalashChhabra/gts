import apiurls from "../../../environment/environment.js";
import { useState, useEffect } from "react";

function getTranslatedBooksData(bookStatus) {
  try {
    let url = `${apiurls.getTransinProgressApi}?status=${bookStatus}`;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status == 403) {
          throw new Error("Session Invalid");
        }
      })
      .then((res) =>
        res.map((data) => ({
          docId: data.docId,
          lfaId: data.lfaId,
          bookTitle: data.bookTitle,
          originalLanguage: data.originalLanguage,
          translationIn: data.translationIn,
          approxLength: data.approxLength,
          category: data.category,
          docUrl: data.docUrl,
          metaDesc: data.metaDesc,
          keywords: data.keywords,
          status: data.status,
        }))
      );
  } catch (error) {
    console.log("session Invalid");
  }
}

export function useTranslatedBooksData(bookStatus) {
  //custom hook to set data
  const [loading, setLoading] = useState(true);
  const [booksData, setBooksData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    //useEffect hook to fetch all industry type for dropdown display
    getTranslatedBooksData(bookStatus)
      .then((data) => {
        setBooksData(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    booksData,
    error,
  };
}
