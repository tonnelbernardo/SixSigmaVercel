import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const DeleteRecord = ({ recordId, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:2999/records/${recordId}`);
      onDelete(recordId);
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>Excluir</Button>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 300 }}>
          <Typography variant="h5" gutterBottom>Excluir Registro</Typography>
          <Typography variant="body1" gutterBottom>Deseja excluir permanentemente este registro?</Typography>
          <Button variant="contained" onClick={handleDelete}>Confirmar</Button>
          <Button variant="outlined" onClick={handleCloseModal} style={{ marginLeft: '8px' }}>Cancelar</Button>
        </Box>
      </Modal>
    </div>
  );
};

DeleteRecord.propTypes = {
  recordId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteRecord;
