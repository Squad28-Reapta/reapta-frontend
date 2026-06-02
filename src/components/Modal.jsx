import React, { useEffect } from 'react';
import '../styles/Modal.css';

export default function Modal({ titulo, onClose, children, largura = '560px' }) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = original;
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        style={{ maxWidth: largura }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-titulo">{titulo}</h3>
          <button
            className="modal-fechar"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>
        <div className="modal-corpo">{children}</div>
      </div>
    </div>
  );
}
