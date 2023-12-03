import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Navigation from './Navigation'; // Import your Navigation component
import Helpdesk from './components/HelpDesk'; // Import your Helpdesk component
import AgentDashboard from './components/AgentDashboard'; // Import your AgentDashboard component
// import { data } from './sampleData/data'; // Import your data

const AppRouter: React.FC = () => {
    return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/helpdesk" element={<Helpdesk />} />
          <Route path="/agent-dashboard" element={<AgentDashboard/>} />
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    );
  };
  

export default AppRouter;