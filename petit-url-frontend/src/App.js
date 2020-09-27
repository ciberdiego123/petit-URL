import React from 'react';
import './App.css';
import GenerateCode from './GenerateCode';
import Title from './Title';

function App() {
  return (        
    <div className="App">      
      <Title/>       
      <header className="App-header">                     
        <GenerateCode/>        
      </header>
    </div>
  );
}

export default App;
