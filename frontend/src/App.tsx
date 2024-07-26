import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserAuth from "./utils/UserAuth";
import AdminAuth from "./utils/AdminAuth";
import DashboardUser from "./pages/DashboardUser";
import DashboardAdmin from "./pages/DashboardAdmin";
import AddUser from "./pages/AddUser";
import UserList from "./pages/UserList";


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route
            path="/dashboard-user"
            element={
              <UserAuth>
                <DashboardUser />
              </UserAuth>
            }
          ></Route>
           <Route
            path="/dashboard-admin"
            element={
              <AdminAuth>
                <DashboardAdmin />
              </AdminAuth>
            }
          ></Route>
          <Route
            path="/create-user"
            element={
              <AdminAuth>
                <AddUser />
              </AdminAuth>
            }
          ></Route>
               <Route
            path="/all-user"
            element={
              <AdminAuth>
                <UserList />
              </AdminAuth>
            }
          ></Route>
        </Route>
     
      </Routes>
    </Router>
  );
}

export default App;
