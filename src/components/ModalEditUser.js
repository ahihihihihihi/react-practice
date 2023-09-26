import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';


const ModalEditUser = (props) => {
    const { show, handleClose, handleUpdateTable } = props
    let { dataUserEdit, setUserEdit } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    useEffect(() => {
        if (show === true) {
            setName(dataUserEdit.first_name)
            setJob(dataUserEdit.last_name)
        }
    }, [dataUserEdit])

    const handleSubmit = async () => {
        if (!name) {
            toast.warn("First name is required!")
            return
        }
        if (!job) {
            toast.warn("Last name is required!")
            return
        }
        let res = await putUpdateUser(name, job, dataUserEdit.id)
        // console.log(">>>check data res: ", res)
        if (!res) {
            toast.error("something's not right")
            return
        }

        handleUpdateTable({
            id: dataUserEdit.id,
            first_name: name,
            last_name: job,
            email: dataUserEdit.email
        }, true)
        toast.success("Edit user successfully!")
        resetState()
        handleClose()
        // console.log(">>>check data res: ", res)
    }

    const resetState = () => {
        setName("")
        setJob("")
        setUserEdit({})
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
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
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => resetState()}>
                        Reset form
                    </Button>
                    <Button variant="success" onClick={() => handleSubmit()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser