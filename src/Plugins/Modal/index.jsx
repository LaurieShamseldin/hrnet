import PropTypes from 'prop-types';

const Modal = ({ closeModal, text }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <p>{text}</p>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal : PropTypes.func.isRequired,
  text : PropTypes.string.isRequired,
};

export default Modal;