import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UploadSection from './UploadSection';
import VisualizationSection from './VisualizationSection';
import Navbar from './Navbar';

function UserInterface() {
  const [data, setData] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/upload">
            <UploadSection onDataUpload={setData} />
          </Route>
          <Route path="/visualize">
            <VisualizationSection data={data} />
          </Route>
          <Route path="/">
            <h2>Welcome to ClimateDataVisualizer</h2>
            <p>Please upload your climate data to get started.</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default UserInterface;