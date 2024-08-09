import React from 'react'

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  )
}

export default AuthModal
