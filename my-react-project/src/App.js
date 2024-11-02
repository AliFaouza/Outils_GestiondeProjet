import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/message')
    .then(response => response.json())
    .then(data => setMessage(data.message))
    .catch(error => console.error('erreur lors de la récupération des données: ', error));
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         
         
        </a>
      </header>
      <body>
      <h1>Intégration de React et Node.js</h1>
        <div>
        <p>{message}</p>
          <p>
            première application reactjs!!!!
          </p>
        </div>
      </body>

    </div>
  );
}

export default App;
