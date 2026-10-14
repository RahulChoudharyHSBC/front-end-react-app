import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import EmployeeCrud from './EmployeeCrud';

export default function Menu() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/menu/">Home</Link></li>
          <li><Link to="/menu/about">About</Link></li>
          <li><Link to="/menu/contact">Contact</Link></li>
          <li><Link to="/menu/employees">Employees</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/menu/" element={<Home />} />
        <Route path="/menu/about" element={<About />} />
        <Route path="/menu/contact" element={<Contact />} />
        <Route path="/menu/employees" element={<EmployeeCrud />} />
      </Routes>
    </>
  );
}