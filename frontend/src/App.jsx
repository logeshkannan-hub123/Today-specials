import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddDish from "./pages/AddDish.jsx";
import EditDish from "./pages/EditDish.jsx";
import ManageDish from "./pages/ManageDish.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-dish" element={<AddDish />} />
        <Route path="/manage-dish" element={<ManageDish />} />
        <Route path="/edit-dish/:id" element={<EditDish />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
