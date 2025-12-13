import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TopicViewer from './pages/TopicViewer';

function App() {
  return (
    <Router>
      <div className="bg-slate-900 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:id" element={<TopicViewer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
