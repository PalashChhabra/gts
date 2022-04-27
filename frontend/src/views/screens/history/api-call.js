import apiurls from "../../../environment/environment.js";
import { useState, useEffect } from "react";

function getBooksData(history) {
  try {
    let url = `${apiurls.getHistoryApi}`;
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status == 403) {
        history.push("/authError");
      }
    });
  } catch (error) {
    console.log("session Invalid");
  }
}

export function useBooksData(history) {
  //custom hook to set data
  const [loading, setLoading] = useState(true);
  const [booksData, setBooksData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    //useEffect hook to fetch all industry type for dropdown display
    getBooksData(history)
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
