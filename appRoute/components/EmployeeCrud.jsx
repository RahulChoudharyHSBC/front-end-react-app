import { useState } from 'react';

const emptyEmployee = {
  id: '',
  ename: '',
  job: '',
  salary: '',
};

export default function EmployeeCrud() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyEmployee);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const id = Number(form.id);
    const salary = Number(form.salary);

    if (!Number.isInteger(id) || id <= 0) {
      setError('Enter a positive whole-number employee ID.');
      return;
    }

    if (!Number.isFinite(salary) || salary < 0) {
      setError('Enter a valid salary of zero or more.');
      return;
    }

    const duplicateId = employees.some((employee) => (
      employee.id === id && employee.id !== editingId
    ));

    if (duplicateId) {
      setError('That employee ID is already in use.');
      return;
    }

    const updatedEmployee = {
      id,
      ename: form.ename.trim(),
      job: form.job.trim(),
      salary,
    };

    if (editingId === null) {
      setEmployees((currentEmployees) => [...currentEmployees, updatedEmployee]);
    } else {
      setEmployees((currentEmployees) => currentEmployees.map((employee) => (
        employee.id === editingId ? updatedEmployee : employee
      )));
    }

    setForm(emptyEmployee);
    setEditingId(null);
  }

  function handleEdit(employee) {
    setForm({
      id: String(employee.id),
      ename: employee.ename,
      job: employee.job,
      salary: String(employee.salary),
    });
    setEditingId(employee.id);
    setError('');
  }

  function handleDelete(id) {
    setEmployees((currentEmployees) => currentEmployees.filter((employee) => employee.id !== id));

    if (editingId === id) {
      setForm(emptyEmployee);
      setEditingId(null);
    }
  }

  function handleCancel() {
    setForm(emptyEmployee);
    setEditingId(null);
    setError('');
  }

  return (
    <main className="employee-crud">
      <h1>Employees</h1>

      <form className="employee-form" onSubmit={handleSubmit}>
        <label>
          Employee ID
          <input
            name="id"
            type="number"
            min="1"
            step="1"
            value={form.id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Employee Name
          <input
            name="ename"
            type="text"
            value={form.ename}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Job
          <input
            name="job"
            type="text"
            value={form.job}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Salary
          <input
            name="salary"
            type="number"
            min="0"
            step="0.01"
            value={form.salary}
            onChange={handleChange}
            required
          />
        </label>
        <div className="employee-form-actions">
          <button type="submit">
            {editingId === null ? 'Add Employee' : 'Save Changes'}
          </button>
          {editingId !== null && (
            <button type="button" onClick={handleCancel}>Cancel</button>
          )}
        </div>
      </form>

      {error && <p className="employee-error" role="alert">{error}</p>}

      <div className="employee-table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Job</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5">No employees yet. Add an employee using the form above.</td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.ename}</td>
                  <td>{employee.job}</td>
                  <td>{employee.salary}</td>
                  <td className="employee-actions">
                    <button type="button" onClick={() => handleEdit(employee)}>Edit</button>
                    <button type="button" onClick={() => handleDelete(employee.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
