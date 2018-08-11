import React, { Component } from 'react';
import Routes from './routes/index';



class App extends Component {
  render() {
    return (
      <div className="App" style={{ height: 'inherit' }}>

        {/* All routes are rendered below */}
        <Routes />
        
      </div>
    );
  }
}

export default App;
