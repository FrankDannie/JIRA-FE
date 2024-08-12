import React from 'react'
import { Box, Typography, Modal as MUIModal } from '@mui/material'
import Button from '../atoms/Button'
import styles from '../../styles/confirmationModal.module.scss'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, description }) => {
  return (
    <MUIModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
      className={styles.modalContainer}
    >
      <Box className={styles.modalContent}>
        <Typography id="confirmation-modal-title" variant="h6" component="h2">
          {title || 'Confirm Action'}
        </Typography>
        <Typography id="confirmation-modal-description" variant="body1" className={styles.modalDescription}>
          {description || 'Are you sure you want to proceed?'}
        </Typography>
        <Box className={styles.buttonContainer}>
          <Button label="Cancel" onClick={onClose} />
          <Button
            label="Confirm"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          />
        </Box>
      </Box>
    </MUIModal>
  )
}

export default ConfirmationModal
