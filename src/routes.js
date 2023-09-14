import { Route, Routes, BrowserRouter } from "react-router-dom";
import Admin from "./Pages/Admin";
import User from "./Pages/User";
import Header from "./Components/Header";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
