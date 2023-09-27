import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { deleteUpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';


const ModalDeleteUser = (props) => {
    const { show, handleClose, handleUpdateTable } = props
    let { dataUserDelete, setUserDelete } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    useEffect(() => {
        if (show === true) {
            setName(dataUserDelete.first_name)
            setJob(dataUserDelete.last_name)
        }
    }, [dataUserDelete])

    const handleSubmit = async () => {
        if (!name) {
            toast.warn("First name is required!")
            return
        }
        if (!job) {
            toast.warn("Last name is required!")
            return
        }
        let res = await deleteUpdateUser(dataUserDelete.id)
        // console.log(">>>check data res: ", res)
        if (!res) {
            toast.error("something's not right")
            return
        }

        handleUpdateTable({
            id: dataUserDelete.id,
            first_name: name,
            last_name: job,
            email: dataUserDelete.email
        }, true)
        toast.success("Edit user successfully!")
        resetState()
        handleClose()
        // console.log(">>>check data res: ", res)
    }

    const resetState = () => {
        setName("")
        setJob("")
        setUserDelete({})
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                autoFocus
                                value={name}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={job}
                                disabled
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => handleSubmit()}>
                        Confirm Delete ?
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteUser