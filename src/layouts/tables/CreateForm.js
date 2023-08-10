import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import axios from 'axios';

const CreateForm = ({ onRecordCreated }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');

  const handleCreateRecord = async () => {
    const newRecord = { nome, idade, email };
    try {
      const response = await axios.post('api/records', newRecord);
      onRecordCreated(response.data);
      setNome('');
      setIdade('');
      setEmail('');
    } catch (error) {
      console.error(error);
      // Aqui você pode tratar o erro, exibindo uma mensagem de erro para o usuário, por exemplo.
    }
  };

  return (
    <div>
      <TextField
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <TextField
        label="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleCreateRecord}>
        Criar
      </Button>
    </div>
  );
};

CreateForm.propTypes = {
  onRecordCreated: PropTypes.func.isRequired,
};

export default CreateForm;
