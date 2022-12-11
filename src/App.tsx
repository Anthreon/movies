import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainRoutes from "./routing/MainRoutes";

function App() {
  return (
    <BrowserRouter>
      <MainRoutes></MainRoutes>
    </BrowserRouter>
  );
}

export default App;
