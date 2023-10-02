import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Alert } from 'react-bootstrap';


const PrivateRoute = (props) => {
    // console.log(">>> check props: ", props)

    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger" className='my-3'>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        Access is denied!
                    </p>
                </Alert>
            </>
        )
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute


