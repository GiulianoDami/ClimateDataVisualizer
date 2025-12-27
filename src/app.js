import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UploadPage from './components/UploadPage'
import VisualizationPage from './components/VisualizationPage'
import HomePage from './components/HomePage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/upload" component={UploadPage} />
          <Route path="/visualize" component={VisualizationPage} />
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))