"use client"
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { ModalInterface } from './interfaces/modal.interface';

const MyModal = ({ open, onClose, children } : ModalInterface) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div>
        {children}
      </div>
    </Modal>
  );
};

export default MyModal;
