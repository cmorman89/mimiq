import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Generate } from "./pages/Generate";
import { Knowledge } from "./pages/Knowledge";
import { Workflow } from "./pages/Workflow";
import { Utilities } from "./pages/Utilities";
import { Settings } from "./pages/Settings";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/utilities" element={<Utilities />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
