import logo from './logo.svg';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [targetAmount, setTargetAmount] = useState('');
  const [coinDenominations, setCoinDenominations] = useState('');
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const API_BASE_URL = 'http://13.250.10.152:8080';
      const response = await axios.get(`${API_BASE_URL}/coin-calculator`, {
        params: {
          targetAmount: targetAmount,
          coinDenominations: coinDenominations,
        },
      }
      );
      setResult(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
          setError(error.response.data);
      } else {
          setError('An unexpected error occurred.');
      }
    }
  }

  const clearForm = () => {
    setTargetAmount('');
    setCoinDenominations('');
    setResult([]);
    setError(null);
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Coin Calculator</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Target Amount:
              <input
                type="number"
                step="0.01"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Coin Denominations (comma-separated):
              <input
                type="text"
                value={coinDenominations}
                onChange={(e) => setCoinDenominations(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Calculate</button>
          <button type="button" onClick={clearForm} style={{ marginLeft: '10px' }}>Clear</button>
        </form>
        {result.length > 0 && (
          <div>
            <h2>Result:</h2>
            <ul>
              {result.map((coin, index) => (
                <li key={index}>{coin}</li>
              ))}
            </ul>
          </div>
        )}
        {error && (
          <div style = {{color: 'red'}}>
          <h2>Error</h2>
          <p>{error}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
