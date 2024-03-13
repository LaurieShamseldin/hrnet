import Table from '../../components/Table';

import './style.css'

const Employee = () => {
  return (
    <main className="employee">
      <h2 className="employee__title">Current Employee</h2>
      <Table />
    </main>
  );
};

export default Employee;