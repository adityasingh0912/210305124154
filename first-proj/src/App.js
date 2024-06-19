import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'doten';
dotenv.config()
function App() {
  const [numberid, setnumberid] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(0);
  const url = "http://20.244.56.144/numbers/{numberid}";
  const token = process.env.token

  const handleInputChange = (e) => {
    setnumberid(e.target.value);
  };

  useEffect(() => {
    const fetchDataWithHeaders = async () => {
      try {
        const response = await axios.get(url.replace("{numberid}", numberid), {
          headers: {
            'Authorization': `Beare ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const numbersData = response.data;
        setNumbers(numbersData);
        const sum = numbersData.reduce((acc, current) => acc + current, 0);
        const averageValue = sum / numbersData.length;
        setAverage(averageValue);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataWithHeaders();
  }, [numberid]);
  return (
    <div className="App">
      <h1>
        Developer Average Calculator Http Microservice
      </h1>
      <input type="text" id="input" value={numberid} onChange={handleInputChange}  placeholder="p - Prime, f -Fibonacci, r- Random"/>      
      <p>Numbers: {numbers.join(', ')}</p>
      <p>Average: {average}</p>
    </div>
  );
}

export default App;