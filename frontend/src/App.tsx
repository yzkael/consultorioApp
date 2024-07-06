import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ToastProvider from "./context/appContext";

function App() {
  return (
    <>
      <Router>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<></>} />
          </Routes>
        </ToastProvider>
      </Router>
    </>
  );
}

export default App;
