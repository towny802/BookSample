import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fakerapi.it/api/v1/images?_width=380');
      if (response.data && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleItemClick = (index) => {
    setSelected(selected === index ? null : index);
  };

  return (
    <div className="App">
      <h1>Accordion with Dropdowns</h1>
      {data.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className={`accordion-title ${selected === index ? 'active' : ''}`}
            onClick={() => handleItemClick(index)}
          >
            {item.title}
          </div>
          <div className={`accordion-description ${selected === index ? 'active' : ''}`}>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
