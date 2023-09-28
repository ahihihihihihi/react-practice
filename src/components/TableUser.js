import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';
import { Button } from 'react-bootstrap';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import _, { debounce } from 'lodash';
import { CSVLink } from "react-csv";


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

    const [sortBy, setSortBy] = useState('id')
    const [sortField, setSortField] = useState('asc')

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

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy)
        setSortField(sortField)
        let cloneListUser = _.cloneDeep(listUsers)
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        // console.log(">>>check sort: ", cloneListUser)
        setListUsers(cloneListUser)
    }

    const handleSearch = debounce(async (event) => {
        let term = event.target.value
        // console.log(">>>check term: ", term)
        let tempListUser1 = await fetchAllUser(1)
        tempListUser1 = tempListUser1.data
        let tempListUser2 = await fetchAllUser(2)
        tempListUser2 = tempListUser2.data
        let tempListUser = [...tempListUser1, ...tempListUser2]
        console.log(">>>check tempListUser: ", tempListUser)
        if (term) {
            let cloneListUser = _.cloneDeep(tempListUser)
            cloneListUser = cloneListUser.filter(item => item.email.includes(term))
            // console.log(">>>check cloneListUser: ", cloneListUser)
            setListUsers(cloneListUser)
        } else {
            getUsers(1)
        }
    }, 500)

    const headers = [
        { label: "ID", key: "id" },
        { label: "First Name", key: "first_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Email", key: "email" },
    ]

    // console.log(">>>check sort: ", sortBy, sortField)
    return (
        <>

            <div className='add-new my-3'>
                <span><b>List users: </b></span>
                <div>
                    <label htmlFor='test' className='btn btn-warning'>
                        <i className="fa-solid fa-file-import"></i>&nbsp;
                        Import
                    </label>
                    <input id='test' type='file' hidden />
                    <CSVLink
                        data={listUsers}
                        headers={headers}
                        filename={"user.csv"}
                        className="btn btn-primary mx-2"
                    >
                        <i className="fa-solid fa-file-arrow-down"></i>&nbsp;
                        Export
                    </CSVLink>
                    <button className='btn btn-success'
                        onClick={() => setIsShowModalAddNew(true)}
                    >
                        <i className="fa-solid fa-circle-plus"></i>&nbsp;
                        Add new
                    </button>
                </div>

            </div>
            <div className='col-4 my-3'>
                <input className='form-control'
                    placeholder='search user by email...'
                    onChange={(event) => handleSearch(event)}
                />
            </div>

            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span>ID</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort('desc', 'id')}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'id')}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='sort-header'>
                                <span>Email</span>
                            </div>
                        </th>
                        <th>
                            <div className='sort-header'>
                                <span>First Name</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort('desc', 'first_name')}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'first_name')}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='sort-header'>
                                <span>Last Name</span>
                            </div>
                        </th>
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