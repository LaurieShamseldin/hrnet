import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { PERSIST } from 'redux-persist';


import employeeReducer from './reducers/employee';

// Configuration de la persistance
const persistConfig = {
  key: 'root',
  storage,
  // Ajoutez d'autres options de configuration selon vos besoins
};

// Combinez les réducteurs et appliquez la persistance
const rootReducer = combineReducers({
  employee: employeeReducer,
  // Ajoutez d'autres réducteurs si nécessaire
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Créez et exportez le magasin
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [ PERSIST ],
      },
    }),
});


export default store;
