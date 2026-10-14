import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/employees';
const emptyForm = { ename: '', job: '', salary: '' };

function EmployeeCRUD() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function fetchEmployees() {
    setError('');
    try {
      const response = await axios.get(API);
      setEmployees(response.data);
    } catch (requestError) {
      console.error('Could not load employees:', requestError);
      setError('Could not load employees. Check that the backend server is running.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const payload = {
      ename: form.ename.trim(),
      job: form.job.trim(),
      salary: Number(form.salary),
    };

    if (!payload.ename || !payload.job || !Number.isFinite(payload.salary) || payload.salary < 0) {
      setError('Enter a name, job, and a valid non-negative salary.');
      return;
    }

    try {
      if (editId === null) {
        await axios.post(API, payload);
      } else {
        await axios.put(`${API}/${editId}`, payload);
      }

      setForm(emptyForm);
      setEditId(null);
      await fetchEmployees();
    } catch (requestError) {
      console.error('Could not save employee:', requestError);
      setError(requestError.response?.data?.error || 'Could not save the employee.');
    }
  }

  function handleEdit(employee) {
    setEditId(employee.id);
    setForm({
      ename: employee.ename,
      job: employee.job,
      salary: String(employee.salary),
    });
    setError('');
  }

  async function handleDelete(id) {
    setError('');
    try {
      await axios.delete(`${API}/${id}`);
      if (editId === id) {
        setEditId(null);
        setForm(emptyForm);
      }
      await fetchEmployees();
    } catch (requestError) {
      console.error('Could not delete employee:', requestError);
      setError(requestError.response?.data?.error || 'Could not delete the employee.');
    }
  }

  function handleCancel() {
    setEditId(null);
    setForm(emptyForm);
    setError('');
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1>Employee CRUD</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
        <label>
          Employee name
          <input
            name="ename"
            value={form.ename}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Job
          <input
            name="job"
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
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">{editId === null ? 'Add Employee' : 'Save Changes'}</button>
          {editId !== null && (
            <button type="button" onClick={handleCancel}>Cancel</button>
          )}
        </div>
      </form>

      {error && <p role="alert" style={{ color: 'red', marginBottom: 16 }}>{error}</p>}

      {loading ? (
        <p>Loading employees…</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee name</th>
                <th>Job</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5">No employees found. Add one using the form above.</td>
                </tr>
              ) : employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.ename}</td>
                  <td>{employee.job}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <button type="button" onClick={() => handleEdit(employee)}>Edit</button>{' '}
                    <button type="button" onClick={() => handleDelete(employee.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default EmployeeCRUD;
