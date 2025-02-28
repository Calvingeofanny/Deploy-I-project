import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "toastify-js/src/toastify.css";
import store from "./app/store.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="1047803747853-o1jhlchdnfhs475qte4pjjqpl4gv1i96.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
