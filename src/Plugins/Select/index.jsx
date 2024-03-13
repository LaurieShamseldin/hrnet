import PropTypes from 'prop-types';

import './style.css'

const Select = ({ name, textLabel, options, value, onChange }) => {
  return (
    <div className="select-wrapper">
      <label htmlFor={name}>{textLabel}</label>
      <select value={value} onChange={onChange} id={name} name={name}>
        {options.map(option => (
          <option key={option.text} value={option.text}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  name : PropTypes.string.isRequired,
  textLabel : PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Select;