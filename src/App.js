
import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import AppRoutes from './components/routes/AppRoutes';
import { useSelector } from 'react-redux';
import { handleRefresh } from './redux/actions/userAction';
import { useDispatch } from "react-redux";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {

  const dataUserRedux = useSelector(state => state.user.account)
  // console.log(">>> check user redux: ", dataUserRedux)

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('email')) {
      dispatch(handleRefresh())
    }
  }, [])
  // console.log(">>>check user: ", user)

  return (
    <>

      <div className='app-container'>
        <Header />
        <Container>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
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
