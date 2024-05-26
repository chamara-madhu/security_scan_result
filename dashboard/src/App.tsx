import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ADMIN_DASHBOARD_PATH } from "./constant/paths";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ADMIN_DASHBOARD_PATH} element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
