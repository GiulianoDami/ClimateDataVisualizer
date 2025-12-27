import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Upload from './components/Upload'
import Visualize from './components/Visualize'
import Home from './components/Home'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/visualize" component={Visualize} />
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))