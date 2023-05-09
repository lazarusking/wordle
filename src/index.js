import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
// import "./style.css";
import "./index.css";
import { AlertProvider } from "./contexts/AlertContext.js";
import { StorageProvider } from "./contexts/StorageContext.js";
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <StorageProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </StorageProvider>
  </StrictMode>
);
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(new URL("./sw.js", import.meta.url))
    .then(function (registration) {
      console.debug("ServiceWorker Registered with scope:", registration.scope);
    })
    .catch(function (err) {
      console.debug("ServiceWorker registration failed:", err);
    });
}
