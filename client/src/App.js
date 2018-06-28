import React, { Component } from 'react';
import Routes from './routes/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        {/* All routes are rendered below */}
        <Routes />
        
      </div>
    );
  }
}

export default App;
