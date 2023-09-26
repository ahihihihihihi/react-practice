import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import { useEffect, useState } from 'react';

const TableUser = (props) => {

    useEffect(() => {
        getUsers()
    }, [])

    const [listUsers, setListUsers] = useState([])

    const getUsers = async () => {
        let res = await fetchAllUser();
        if (res && res.data) {
            setListUsers(res.data)
        }
        // console.log(">>> check res: ", res)
    }

    // console.log(">>> check listUsers: ", listUsers)

    return (
        <>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {

                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default TableUser