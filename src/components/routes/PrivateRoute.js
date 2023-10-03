import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const PrivateRoute = (props) => {
    // console.log(">>> check props: ", props)

    const user = useSelector(state => state.user.account)

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


