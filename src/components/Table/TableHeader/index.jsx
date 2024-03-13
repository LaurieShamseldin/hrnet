import { useState } from 'react';
import PropTypes from 'prop-types';

import './style.css'

const TableHeader = ({ columns, sortUsers }) => {
  // State pour suivre l'ordre de tri de chaque colonne
  const [sortOrders, setSortOrders] = useState({});

  // Fonction de gestion du tri lors du clic sur une colonne
  const handleSort = (column) => {
    let order;
    if (sortOrders[column.data] === 'asc') {
      order = 'desc';
    } else {
      order = 'asc';
    }

    // Réinitialiser toutes les flèches à leur état initial (gris)
    const updatedSortOrders = {};
    columns.forEach(col => {
      updatedSortOrders[col.data] = 'none';
    });

    // Mettre à jour l'état des ordres de tri
    setSortOrders({ ...updatedSortOrders, [column.data]: order });

    // Appeler la fonction de tri
    sortUsers(column.data, order, column.type);
  };

  // Fonction pour déterminer la classe de la flèche de tri
  const getArrowClass = (column) => {
    if (sortOrders[column.data] === 'asc') return 'arrow-up';
    if (sortOrders[column.data] === 'desc') return 'arrow-down';
    return 'arrow-none'; // Aucun tri appliqué
  };

  return (
    <thead>
      <tr>
        {columns.map((column, colIndex) => (
          <th key={colIndex} onClick={() => handleSort(column)}>
            {column.title} <span className={`sort-arrow ${getArrowClass(column)}`}></span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['string', 'date']).isRequired 
    })
  ).isRequired,
  sortUsers: PropTypes.func.isRequired
};

export default TableHeader;
