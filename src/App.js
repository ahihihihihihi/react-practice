import './App.scss';
import Header from './components/Header';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>

      <div className='app-container'>
        <Header />
        <Container>
          <TableUser />
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
