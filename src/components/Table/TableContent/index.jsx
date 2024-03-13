import PropTypes from 'prop-types';

const TableContent = ({ datas, columns }) => {
  return (
    <tbody className="table__content">
      {datas.map((user, index) => (
        <tr key={index}>
          {columns.map((column, colIndex) => (
            <td key={colIndex}>{user[column.data]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableContent.propTypes = {
  datas: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      data: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TableContent;