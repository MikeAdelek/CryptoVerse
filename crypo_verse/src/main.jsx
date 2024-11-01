import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>
);
