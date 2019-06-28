const API_URL = "https://meeting-reaction.azurewebsites.net";
const API_VERSION = "api";

const WORD_CLOUD_ENDPOINT = "getWordCloud";
const FACIAL_ANALYSIS_ENDPOINT = "getFacialAnalysis";

export const WORD_CLOUD = [API_URL, API_VERSION, WORD_CLOUD_ENDPOINT].join("/");
export const FACIAL_ANALYSIS = [API_URL, API_VERSION, FACIAL_ANALYSIS_ENDPOINT].join("/");