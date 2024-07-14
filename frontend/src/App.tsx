import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardUser from './pages/DashboardUser'
import AdminRoute from "./utils/AdminAuth";
import UserRoute from "./utils/UserAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public */}
          <Route index element={<Login />} />
          <Route path="dashboard" element ={<Dashboard/>}/>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>}/>
            {/* Other admin routes */}


          {/* User Routes */}
          <Route path="/user" element={<UserRoute><DashboardUser /></UserRoute>}/>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
