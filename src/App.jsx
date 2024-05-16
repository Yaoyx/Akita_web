import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route exact path="/Akita_web/" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
