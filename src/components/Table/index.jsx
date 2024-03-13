import { useState } from 'react';
import TableHeader from './TableHeader';
import TableContent from './TableContent';
import SearchBar from '../Search';
import { useSelector } from 'react-redux';
import columns from '../../data/columns.json';

import './style.css'

const Table = () => {
  const allUsers = useSelector((state) => state.employee.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Réinitialiser la page actuelle lorsqu'une nouvelle recherche est effectuée
  };

  // Filtrer les utilisateurs en fonction de la chaîne de recherche
  const filteredUsers = allUsers.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Trier les utilisateurs par ordre alphabétique en fonction de la colonne sélectionnée
  const sortUsers = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    const columnA = (a[sortColumn] || '').toString().toLowerCase(); // Vérifier si la clé existe, sinon utiliser une chaîne vide
    const columnB = (b[sortColumn] || '').toString().toLowerCase(); // Vérifier si la clé existe, sinon utiliser une chaîne vide
    console.log(typeof columnA);
    let comparison = 0;
    if (columnA > columnB) {
      comparison = 1;
    } else if (columnA < columnB) {
      comparison = -1;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });


  // Calculer le nombre total de pages
  const totalPages = Math.ceil(sortedUsers.length / perPage);

  // Calculer l'indice de début et de fin pour la pagination
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, sortedUsers.length);

  // Sélectionner les données à afficher pour la page actuelle
  const usersToShow = sortedUsers.slice(startIndex, endIndex);

  // Gérer le changement de nombre d'entrées par page
  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Revenir à la première page lorsque le nombre d'entrées par page change
  };

  // Gérer le changement de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="table">
      <div className="table__header">
        <div className="table-options">
          <label htmlFor="perPage">Show</label>
          <select id="perPage" value={perPage} onChange={handlePerPageChange}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select> 
          entries
        </div>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      </div>
      <table>
        <TableHeader columns={columns} sortUsers={sortUsers} />
        <TableContent columns={columns} datas={usersToShow} />
      </table>

      <div className="table__footer">
        <div className="entries-info">
          Showing <span className="info__bold">{startIndex + 1}</span> to <span className="info__bold">{endIndex}</span> of {sortedUsers.length} entries
        </div>


        <div className="pagination">
          {/* Affichage des boutons de pagination */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Table;