//Environment File for API's
const baseAPIurl = "http://localhost:9000/api";

const apiurls = {
  registerApi: `${baseAPIurl}/register`,
  loginApi: `${baseAPIurl}/login`,
  logoutApi: `${baseAPIurl}/logout`,
  getUserDetails: `${baseAPIurl}/getUserDetails`,
  getBooksApi: `${baseAPIurl}/getBooks`,
  savetranslationApi: `${baseAPIurl}/saveBook`,
  getTransinProgressApi: `${baseAPIurl}/getBooksByStatus`,
  getInProgressDataApi: `${baseAPIurl}/resumeTranslation`,
  publishBookContentAPI: `${baseAPIurl}/updateBookStatus`,
  deleteTranslationApi: `${baseAPIurl}/discardTranslation`,
  getHistoryApi: `${baseAPIurl}/getHistory`,
  rejectTranslationApi: `${baseAPIurl}/reject`,
  tinyMCE_Editor_APIKey: "0z6lhvdoii2iljfyn74zepvn2yq4zc9drpybxze3wsg2g1d5",
};

export default apiurls;
