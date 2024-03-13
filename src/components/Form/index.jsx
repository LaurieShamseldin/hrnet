import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { changeInput, saveUserData, clearForm } from '../../store/reducers/employee';
import Select from 'dropdown-styled';
import Modal from '../../Plugins/Modal'
import InputDate from '../../Plugins/Date'
import { departmentList } from '../../data/Department';
import { statesList } from '../../data/States';

import './style.css'

const Form = () => {
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.employee.firstName);
  const lastName = useSelector((state) => state.employee.lastName);
  const startDate = useSelector((state) => state.employee.startDate);
  const dateOfBirth = useSelector((state) => state.employee.dateOfBirth);
  const street = useSelector((state) => state.employee.street);
  const city = useSelector((state) => state.employee.city);
  const zipCode = useSelector((state) => state.employee.zipCode);
  const state = useSelector((state) => state.employee.state);
  const department = useSelector((state) => state.employee.department);

  const [selectedValuDepartement, setSelectedValueDepartement] = useState(departmentList[0]?.text || '');
  const [selectedValueState, setSelectedValueState] = useState(statesList[0]?.text || '');
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(changeInput({ key: name, value: value }));
  };

  const handleDepartmentChange = (event, valueKey) => {
    dispatch(changeInput({ key: valueKey, value: event.target.value }));
    setSelectedValueDepartement(event.target.value);
  };

  const handleStateChange = (event, valueKey) => {
    dispatch(changeInput({ key: valueKey, value: event.target.value }));
    setSelectedValueState(event.target.value);
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSave = (event) => {
    event.preventDefault();
    const formattedDateOfBirth = formatDate(dateOfBirth);
    const formattedStartDate = formatDate(startDate);

    const userData = {
      firstName,
      lastName,
      dateOfBirth: formattedDateOfBirth,
      startDate: formattedStartDate,
      street,
      city,
      state,
      zipCode,
      department,
    };
    dispatch(saveUserData(userData)); // Enregistrer les données utilisateur
    setShowModal(true);
    event.target.reset(); // Réinitialiser le formulaire après l'enregistrement
    dispatch(clearForm());
  };

  const closeModal = () => {
    setShowModal(false); 
  };

  useEffect(() => {
    dispatch(changeInput({ key: 'department', value: selectedValuDepartement }));
    dispatch(changeInput({ key: 'state', value: selectedValueState }));
  }, [dispatch, selectedValuDepartement, selectedValueState]);

  return (
    <form onSubmit={handleSave} className="employee__form">
      {showModal && <div className="page-overlay" onClick={closeModal}></div>}
      <section className="employee__input">
        <div className="employee__form-left">
          <div className="input-wrapper">
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" name="firstName" value={firstName}  onChange={handleInputChange} required/>
          </div>

          <div className="input-wrapper">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastName"  onChange={handleInputChange} value={lastName} required/>
          </div>

          <InputDate nameInput="datebirth" onChange={handleInputChange} textName="Date of Birth" nameStore="dateOfBirth"/> 
          <InputDate nameInput="startdate" onChange={handleInputChange} textName="Start Date" nameStore="startDate"/> 

          <div className="input-wrapper">
            <Select options={departmentList} value={selectedValuDepartement} onChange={(event) => handleDepartmentChange(event, 'department')} name='department' textLabel='Department' required/>
          </div>

        </div> 

        <div className="employee__form-right">
          <fieldset className="address">
            <legend>Address</legend>
            <div className="input-wrapper">
              <label htmlFor="steet">Street</label>
              <input type="text" id="street" name="street"  onChange={handleInputChange} value={street} required/>
            </div>

            <div className="input-wrapper">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city"  onChange={handleInputChange} value={city} required/>
            </div>

            <div className="input-wrapper">
              <Select options={statesList} value={selectedValueState} onChange={(event) => handleStateChange(event, 'state')} name='state' textLabel='State' required/>
            </div>

            <div className="input-wrapper">
              <label htmlFor="zipCode">Zip Code</label>
              <input type="text" id="zipCode" name="zipCode"  onChange={handleInputChange} value={zipCode} required/>
            </div>

          </fieldset>
        </div>
      </section>

      <button type="submit" className="sign-in-button">Save</button>

      {showModal && <Modal closeModal={closeModal} text="Employee created !"/>} {}

    </form>

  );
};


export default Form;

