import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder='Search...'
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm : PropTypes.string,
  handleSearch : PropTypes.func.isRequired,
};

export default SearchBar;