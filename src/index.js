import React from "react";
import { render } from "react-dom";
import "bootstrap";

import "./assets/favicon/favicon";
import "./assets/scss/ey-font.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/base.scss";

import Main from "./components/Main/Main.jsx";

const rootElement = document.getElementById("root");
rootElement ? render(<Main />, rootElement) : false;