import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';
import { Button } from 'react-bootstrap';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';


const TableUser = (props) => {

    useEffect(() => {
        getUsers(1)
    }, [])

    let [listUsers, setListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [userEdit, setUserEdit] = useState({})

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [userDelete, setUserDelete] = useState({})

    const handleClose = () => {
        setIsShowModalAddNew(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
    }

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setListUsers(res.data)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
        }
        // console.log(">>> check res: ", res)
    }

    // console.log(">>> check listUsers: ", listUsers)

    const handlePageClick = (event) => {
        // console.log(">>>check event: ", event)
        getUsers(+event.selected + 1)
    }

    const handleUpdateTable = (user, flag = false) => {
        if (flag) {
            let userIndex = listUsers.findIndex((item) => item.id === user.id)
            // console.log(">>>check userIndex: ", userIndex, ">>> user: ", user)
            if (user && user.first_name) {
                listUsers[userIndex] = user
                // console.log(">>>abc ", listUsers)
            } else {
                listUsers.splice(userIndex, 1)
                // console.log(">>>def ", listUsers)
            }
            setListUsers([...listUsers])
            // console.log(">>>check listUsers: ", listUsers)
            return
            // listUsers.splice(userIndex, 1)
        }
        setListUsers([user, ...listUsers])
    }

    const handleEditUser = (user) => {
        // console.log(">>>check user: ", user)
        setUserEdit(user)
        setIsShowModalEdit(true)
    }

    const handleDeleteUser = (user) => {
        // console.log(">>>check user: ", user)
        setUserDelete(user)
        setIsShowModalDelete(true)
    }

    return (
        <>

            <div className='add-new my-3'>
                <span><b>List users: </b></span>
                <button className='btn btn-success'
                    onClick={() => setIsShowModalAddNew(true)}
                >
                    Add new user
                </button>
            </div>

            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
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
                                    <td>
                                        <Button variant='warning' className='mx-3'
                                            onClick={() => handleEditUser(item)}
                                        >Edit
                                        </Button>

                                        <Button variant='danger'
                                            onClick={() => handleDeleteUser(item)}
                                        >Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <ModalAddNewUser
                show={isShowModalAddNew}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />

            <ModalEditUser
                show={isShowModalEdit}
                handleClose={handleClose}
                dataUserEdit={userEdit}
                setUserEdit={setUserEdit}
                handleUpdateTable={handleUpdateTable}
            />

            <ModalDeleteUser
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={userDelete}
                setUserDelete={setUserDelete}
                handleUpdateTable={handleUpdateTable}
            />

            {/* https://codepen.io/monsieurv/pen/abyJQWQ */}
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />

        </>
    )
}

export default TableUser