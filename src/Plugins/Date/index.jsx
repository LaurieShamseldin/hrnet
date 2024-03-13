import PropTypes from 'prop-types';

import './style.css'

const InputDate = ({ nameInput, onChange, textName, nameStore }) => {
  return (
    <div className="input-wrapper input-date">
      <label htmlFor={nameInput}>{textName}</label>
      <input type="date" id={nameInput} name={nameStore} onChange={onChange} required/>
    </div>
  );
};

InputDate.propTypes = {
  nameInput : PropTypes.string.isRequired,
  onChange : PropTypes.func.isRequired,
  textName : PropTypes.string.isRequired,
  nameStore : PropTypes.string.isRequired,
};



export default InputDate;