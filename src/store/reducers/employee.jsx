import { createAction, createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Importez le stockage local (ou tout autre stockage souhaité)

export const initialState = {
  firstName: '',
  lastName: '',
  startDate: '',
  dateOfBirth: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  department: '',
  users: []
};

export const changeInput = createAction('employee/changeInput');
export const saveUserData = createAction('employee/saveUserData');
export const clearForm = createAction('employee/clearForm');

// Configuration de la persistance pour le réducteur employee
const employeePersistConfig = {
  key: 'employee',
  storage: storage, // Utilisez le stockage local
};

// Créer un réducteur avec persistance
const employeeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeInput, (state, action) => {
      state[action.payload.key] = action.payload.value;
    })
    .addCase(saveUserData, (state, action) => {
      const newUser = {
        id: state.users.length + 1,
        ...action.payload,
      };
      state.users.push(newUser);
    })

    .addCase(clearForm, (state) => {
      state.firstName = '';
      state.lastName = '';
      state.street = '';
      state.city = '';
      state.state= '';
      state.zipCode = '';
      state.department = '';
    })

});

// Appliquer la configuration de persistance au réducteur
const persistedEmployeeReducer = persistReducer(employeePersistConfig, employeeReducer);

export default persistedEmployeeReducer; // Exportez le réducteur persistant
