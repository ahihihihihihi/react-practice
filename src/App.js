import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
import ModalAddNewUser from './components/ModalAddNewUser';

function App() {

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)

  const handleClose = () => {
    setIsShowModalAddNew(false)
  }

  return (
    <div className='app-container'>
      <Header />
      <Container>
        <div className='add-new my-3'>
          <span><b>List users: </b></span>
          <button className='btn btn-success'
            onClick={() => setIsShowModalAddNew(true)}
          >
            Add new user
          </button>
        </div>
        <TableUser />
        <ModalAddNewUser
          show={isShowModalAddNew}
          handleClose={handleClose}
        />
      </Container>
    </div>
  );
}

export default App;
