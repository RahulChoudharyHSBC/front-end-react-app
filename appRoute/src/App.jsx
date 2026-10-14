import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/Login";
import Menu from "../components/Menu";
import LoginFailed from "../components/LoginFailed";

export default function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/menu/*" element={<Menu />} />
                <Route path="/login-failed" element={<LoginFailed />} />

            </Routes>

        </BrowserRouter>
    );
}