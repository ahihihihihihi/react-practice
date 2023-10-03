
import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { useEffect } from 'react';
import AppRoutes from './components/routes/AppRoutes';
import { useSelector } from 'react-redux';

function App() {

  const dataUserRedux = useSelector(state => state.user.account)
  console.log(">>> check user redux: ", dataUserRedux)

  const { user, loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('email')) {
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'),)
    }
  }, [])
  // console.log(">>>check user: ", user)

  return (
    <>

      <div className='app-container'>
        <Header />
        <Container>
          <AppRoutes />
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
