import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';

const UpdateRecord = ({ recordId, initialData, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
  });

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:2999/api/records/${recordId}`, formData);
      onUpdate(recordId, formData);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpenModal}>Atualizar</Button>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 300 }}>
          <Typography variant="h5" gutterBottom>Atualizar Registro</Typography>
          <TextField label="Nome" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Idade" type="number" name="age" value={formData.age} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
          <Button variant="contained" onClick={handleUpdate}>Confirmar</Button>
          <Button variant="outlined" onClick={handleCloseModal} style={{ marginLeft: '8px' }}>Cancelar</Button>
        </Box>
      </Modal>
    </div>
  );
};

UpdateRecord.propTypes = {
  recordId: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateRecord;
