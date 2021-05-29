import * as React from "react";

import "./App.css";
import Landing from "./components/Landing";
import "./components/style/style.css";
import { ToastProvider } from "react-toast-notifications";
function App() {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={2000}>
      <Landing />
    </ToastProvider>
  );
}

export default App;
