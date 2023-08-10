import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import axios from 'axios';

const EditForm = ({ recordId, onUpdate }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdateRecord = async () => {
    const updatedRecord = { name: nome, age: idade, email: email };
    try {
      const response = await axios.put(`/api/records/${recordId}`, updatedRecord);
      onUpdate(recordId, response.data);
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
      <Button variant="contained" color="primary" onClick={handleUpdateRecord}>
        Editar
      </Button>
    </div>
  );
};

EditForm.propTypes = {
  recordId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditForm;
