import apiurls from "../../../environment/environment.js";
import { useState, useEffect } from "react";

function getBooksData(bookStatus, history) {
  try {
    let url = `${apiurls.getBooksApi}?status=${bookStatus}`;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status == 403) {
          history.push("/authError");
        }
      })
      .then((res) =>
        res.map((data) => ({
          docId: data.docId,
          lfaId: data.lfaId,
          bookTitle: data.bookTitle,
          originalLanguage: data.originalLanguage,
          translationsRequiredIn: data.translationsRequiredIn,
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

export function useBooksData(bookStatus, history) {
  //custom hook to set data
  const [loading, setLoading] = useState(true);
  const [booksData, setBooksData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    //useEffect hook to fetch all industry type for dropdown display
    getBooksData(bookStatus, history)
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
