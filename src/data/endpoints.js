const API_URL = process.env.API_URL;
const API_VERSION = process.env.API_VERSION;

const MEETING_CODE_ENDPOINT = "getCode";
const WORD_CLOUD_ENDPOINT = "getWordCloud";
const FACIAL_ANALYSIS_ENDPOINT = "getFacialAnalysis";
const EMOTION_ENDPOINT = "getEmotion";

export const MEETING_CODE = [API_URL, API_VERSION, MEETING_CODE_ENDPOINT].join("/");
export const WORD_CLOUD = [API_URL, API_VERSION, WORD_CLOUD_ENDPOINT].join("/");
export const FACIAL_ANALYSIS = [API_URL, API_VERSION, FACIAL_ANALYSIS_ENDPOINT].join("/");
export const EMOTION = [API_URL, API_VERSION, EMOTION_ENDPOINT].join("/");