import React from 'react'
import { FaPlus } from 'react-icons/fa'
import styles from '../../styles/addButton.module.scss'

interface AddButtonProps {
  onClick: () => void
  label: string
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, label }) => {
  return (
    <button className={styles.addButton} onClick={onClick}>
      <FaPlus className={styles.icon} />
      {label}
    </button>
  )
}

export default AddButton
