import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Generate } from "./pages/Generate";
import { Knowledge } from "./pages/Knowledge";
import { Workflow } from "./pages/Workflow";
import { Utilities } from "./pages/Utilities";
import { Settings } from "./pages/Settings";
import { KnowledgeDocListView } from "./features/knowledge/KnowledgeDocListView";
import { KnowledgeTypeSelectionView } from "./features/knowledge/KnowledgeTypeSelectionView";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/knowledge" element={<Knowledge />}>
            <Route path="/knowledge" element={<KnowledgeTypeSelectionView />} />
            <Route
              path="blog"
              element={<KnowledgeDocListView docType="blog" />}
            />
            <Route
              path="books"
              element={<KnowledgeDocListView docType="books" />}
            />
            <Route
              path="videos"
              element={<KnowledgeDocListView docType="videos" />}
            />
            <Route
              path="podcasts"
              element={<KnowledgeDocListView docType="podcasts" />}
            />
            <Route
              path="articles"
              element={<KnowledgeDocListView docType="articles" />}
            />
            <Route
              path="other"
              element={<KnowledgeDocListView docType="other" />}
            />
            <Route
              path="all"
              element={<KnowledgeDocListView docType="all" />}
            />
          </Route>
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/utilities" element={<Utilities />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
