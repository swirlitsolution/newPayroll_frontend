
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employeelist from './components/employee/Employeelist'
import NewEmployee from './components/employee/NewEmployee'
import EditEmployee from './components/employee/EditEmployee';
import Attendance from './components/attendance/Attendance';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import axios from 'axios';
import Dashboard from './components/dashboard/Dashboard';
import SideBar from './components/bar/SideBar';
import Login from './components/login/Login';
import AttendanceReport from './components/report/AttendanceReport';
import ProcessAttendance from './components/attendance/ProcessAttendance';
import Settings from './components/settings/Settings';
import UserManagement from './components/settings/UserManagement';
import Employees from './components/settings/Employees';
import CreateUser from './components/settings/CreateUser';
import UpdateUser from './components/settings/UpdateUser';
import PermitReport from './components/report/PermitReport';
import EmployeeTransfer from './components/employee/EmployeeTransfer';
import GangTransfer from './components/employee/GangTransfer';
import TransferLogs from './components/employee/TransferLogs';
import EmpRate from './components/employee/EmpRate';
import PayrollParameter from './components/settings/PayrollParameter';
import Payroll from './components/payroll/Payroll';
import Nh from './components/master/Nh';
import LeaveRegister from './components/report/LeaveRegister';
import BonusRegister from './components/report/BonusRegister';
import Recalculate from './components/attendance/Recalculate';
import SyncData from './components/employee/SyncData';
import TaxSlave from './components/master/TaxSlave';
import EditTaxSlave from './components/master/EditTaxSlave';
import NewLeave from './components/leave/NewLeave';
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'https://backend.vivekconstruction.org';
axios.defaults.baseURL = 'https://global.swirlapps.in';

function App() {
 
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <SideBar>
                  <Routes>
                    <Route path="/home" element={<Dashboard />} />
                    <Route path="/employeelist" element={<Employeelist />} />
                    <Route path="/newemployee" element={<NewEmployee heading="Add new employee" />} />
                    <Route path="/employee/:id" element={<EditEmployee heading="Edit employee" />} />
                    <Route path="/attendance" element={<Attendance heading="Attendance" />} />
                    <Route path="/attendancereport" element={<AttendanceReport heading="Report" />} />
                    <Route path="/permitreport" element={<PermitReport heading="Permit By Report" />} />
                    <Route path="/processattendance" element={<ProcessAttendance heading="Process Attendance" delete={false} />} />
                    <Route path="/adminprocessattendance" element={<ProcessAttendance heading="Process Attendance" delete={true} />} />
                    <Route path="/payrollparameter" element={<PayrollParameter />} />
                    <Route path="/taxslave" element={<TaxSlave />} />
                    <Route path="/taxslave/:id" element={<EditTaxSlave />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/manageuser" element={<UserManagement />} />
                    <Route path="/nh" element={<Nh />} />
                    <Route path="/transfer" element={<EmployeeTransfer />} />
                    <Route path="/transferlog" element={<TransferLogs heading="Transfer Logs" />} />
                    <Route path="/selectemployee" element={<Employees />} />
                    <Route path="/payroll" element={<Payroll />} />
                    <Route path="/recal" element={<Recalculate />} />
                    <Route path="/leave" element={<LeaveRegister />} />
                    <Route path="/bonus" element={<BonusRegister />} />
                    <Route path="/selectgang/:id" element={<GangTransfer />} />
                    <Route path="/createuser/:id" element={<CreateUser />} />
                    <Route path="/updateuser/:id" element={<UpdateUser />} />
                    <Route path="/rate/:id" element={<EmpRate heading="Update Rate" />} />
                    <Route path="/sync" element={<SyncData />} />
                    <Route path="/newleave" element={<NewLeave />} />
                </Routes>
                </SideBar>
              </ProtectedRoute>
            }
            />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
