import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:2999/records'); 
      console.log(response.data);
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  return (
    <div>
      <h2>Records List</h2>
      <ul>
        {records.map((record) => (
          <li key={record._id}>
            {record.nome}, Age: {record.idade} {/* Atualizando para refletir os campos corretos */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListRecords;
