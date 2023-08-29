import './App.css';
import {Toaster} from "react-hot-toast"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import {Protected,Public,Admin} from "./middleware/route";
import Dashboard from './pages/Dashboard';
import ApplyDoctor from './pages/ApplyDoctor';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';

function App() {
  return (
    <>
      <Router>
      <Toaster/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route 
          path='/register'
          element={
            <Public>
              <Register/>
            </Public>
          }/>
        <Route
          path="/applyfordoctor"
          element={
            <Protected>
              <ApplyDoctor/>
            </Protected>
          }
        />
        <Route
          path='/appointments'
          element={
            <Protected>
              <Appointments/>
            </Protected>
          }
        />

        
        <Route 
          path='/dashboard/users'
          element={
            <Admin>
              <Dashboard type={"users"}/>
            </Admin>
          }
        />
        <Route
            path="/dashboard/doctors"
            element={
              <Admin>
                <Dashboard type={"doctors"} />
              </Admin>
            }
          />
          <Route
            path="/dashboard/appointments"
            element={
              <Protected>
                <Dashboard type={"appointments"} />
              </Protected>
            }
          />
          <Route
            path="/dashboard/applications"
            element={
              <Protected>
                <Dashboard type={"applications"} />
              </Protected>
            }
          />
        
      </Routes>
    </Router>
    </>
  );
}

export default App;
