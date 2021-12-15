import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/login/Login";

import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Topbar from "../components/topbar/Topbar";

import ForgotPassword from "../pages/auth/recoveryPassword/ForgotPassword";
import NewPassword from "../pages/auth/recoveryPassword/NewPassword";
import AnimalCreate from "../pages/animal/AnimalCreate";
import VetsList from "../pages/vets/VetsList";
import VetsSpecialties from "../pages/vets/VetsSpecialties";
import EditAccount from "../pages/auth/EditAccount";
import Schedule from "../pages/schedule/Schedule";
import ScheduleVets from "../pages/schedule/ScheduleVets"
import AnimalEdit from "../pages/animal/AnimalEdit"
import Prontuario from "../pages/prontuario/Prontuario"
import NewRecord from "../pages/prontuario/NewRecord"
import RecordDetail from "../pages/prontuario/RecordDetail"
import RecordEdit from "../pages/prontuario/RecordEdit"

import { AuthContextComponent } from "../contexts/authContext";
import Dashboard from "../pages/dashboard/Dashboard";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <AuthContextComponent>
        <Topbar />
        <Routes>
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route path="/signup/:type" element={<Signup />} />
          <Route path="/edit-account/:type" element={<EditAccount />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/new-password/:token" element={<NewPassword />} /> 
          <Route path="/animal-create" element={<AnimalCreate/>}/>
          <Route path="/vets-list/:specialties" element={<VetsList/>}/>
          <Route path="/vets-specialties" element={<VetsSpecialties/>}/>
          <Route path="/animal-edit" element={<AnimalEdit/>}/>
          <Route path="/prontuario/new-record" element={<NewRecord/>}/>
          <Route path="/prontuario" element={<Prontuario/>}/>
          <Route path="/user/schedule/" element={<Schedule />} />
          <Route path="/vet/schedule-edit" element={<ScheduleVets />} />
          <Route path="/animal-edit/:id" element={<AnimalEdit/>}/>
          <Route path="/prontuario/record-detail/:id" element={<RecordDetail/>}/>
          <Route path="/prontuario/record-edit/:id" element={<RecordEdit/>}/>
          
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
