import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [numberid, setnumberid] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(0);
  const url = "http://20.244.56.144/numbers/{numberid}";

  const handleInputChange = (e) => {
    setnumberid(e.target.value);
  };

  useEffect(() => {
    const fetchDataWithHeaders = async () => {
      try {
        const response = await axios.get(url.replace("{numberid}", numberid), {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4Nzc0NDIzLCJpYXQiOjE3MTg3NzQxMjMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImIwZjIyZjdjLTRhMTEtNDgyZi04NzBhLWRiNGI0MTUzMDIwYiIsInN1YiI6IjIxMDMwNTEyNDE1NEBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJBZmZvcmRtZWQgVGVjaG5vbG9naWVzIiwiY2xpZW50SUQiOiJiMGYyMmY3Yy00YTExLTQ4MmYtODcwYS1kYjRiNDE1MzAyMGIiLCJjbGllbnRTZWNyZXQiOiJESE52ZUlrb1JEdERkWXNYIiwib3duZXJOYW1lIjoiQWRpdHlhIiwib3duZXJFbWFpbCI6IjIxMDMwNTEyNDE1NEBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4iLCJyb2xsTm8iOiIyMTAzMDUxMjQxNTQifQ.hX5kN_TQ-2cB2KXzf7_Ci6fD4WdqECrdhMuyn-1a2FA',
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