import { Route, Routes } from 'react-router-dom';
import Home from '../Home';
import TableUser from '../TableUser';
import Login from '../Login';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users"
                    element={
                        <PrivateRoute>
                            <TableUser />
                        </PrivateRoute>
                    } />
            </Routes>
        </>
    )
}

export default AppRoutes