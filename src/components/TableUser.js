import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';


const TableUser = (props) => {

    useEffect(() => {
        getUsers(1)
    }, [])

    const [listUsers, setListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)

    const handleClose = () => {
        setIsShowModalAddNew(false)
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

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers])
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

            <ModalAddNewUser
                show={isShowModalAddNew}
                handleClose={handleClose}
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