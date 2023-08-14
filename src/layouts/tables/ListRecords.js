import React, { useState, useEffect } from 'react';
import axios from 'axios';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 2999;

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://mongol:sixsigma123@sixsigmacluster.jgaedll.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conexão com o MongoDB estabelecida');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

const produtoSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  email: String,
});

const Produto = mongoose.model('Clients', produtoSchema);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:2999', credentials: true }));


const ListRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);


  app.get('/api/records', async (req, res) => {
    try {
      const response = await Produto.find({});
      res.setHeader('Content-Type', 'application/json'); // Definindo o Content-Type para JSON
      res.json(response);
      console.log(response.data);
      setRecords(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar registros' });
    }
  });
 // const fetchRecords = async () => {
  //  try {
  //    const response = await axios.get('http://localhost:2999/api/records'); 
   //   console.log(response.data);
   //   setRecords(response.data);
   // } catch (error) {
   //   console.error('Error fetching records:', error);
   // }
 // };

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
