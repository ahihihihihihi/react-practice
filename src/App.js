import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Home from './components/Home';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { useEffect } from 'react';

function App() {

  const { user, loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('email')) {
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'),)
    }
  }, [])
  console.log(">>>check user: ", user)

  return (
    <>

      <div className='app-container'>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>

          {/* <TableUser /> */}
        </Container>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;
