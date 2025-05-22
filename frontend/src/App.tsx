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
import { useState } from "react";
import ModelList from "./features/models/components/ModelList";

/**
 * Main application component that serves as the root of the React application.
 *
 * This component handles:
 * - Application routing using React Router
 * - Global state management for model selection
 * - Layout structure with MainLayout wrapper
 * - Modal management for model selection
 *
 * The application consists of several main sections:
 * - Home: Landing page
 * - Generate: Content generation interface
 * - Knowledge: Knowledge base with different document types
 * - Workflow: Workflow management
 * - Utilities: Utility tools
 * - Settings: Application settings
 *
 * @component
 * @returns {JSX.Element} The root application component
 */
function App() {
  const [currentModel, setCurrentModel] = useState("No Model Selected");
  const [showModelList, setShowModelList] = useState(false);
  const handleClose = (menuName: string) => {
    if (menuName === "modelList") {
      setShowModelList(false);
    }
  };
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/generate"
            element={
              <Generate
                setShowModelList={setShowModelList}
              />
            }
          />
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
      {showModelList && (
        <ModelList
          setShowModelList={() => handleClose("modelList")}
          currentModel={currentModel}
          setCurrentModel={setCurrentModel}
        />
      )}
    </Router>
  );
}

export default App;
