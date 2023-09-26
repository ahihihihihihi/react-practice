import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';


const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit } = props

    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    useEffect(() => {
        if (show === true) {
            setName(dataUserEdit.first_name)
            setJob(dataUserEdit.last_name)
        }
    }, [dataUserEdit])

    const handleSubmit = async () => {
        // let res = await postCreateUser(name, job)
        // if (!name) {
        //     toast.warn("name is required!")
        //     return
        // }
        // if (!job) {
        //     toast.warn("job is required!")
        //     return
        // }
        // if (!res) {
        //     toast.error("something's not right")
        //     return
        // }
        // handleUpdateTable({
        //     id: res.id,
        //     first_name: res.name,
        //     last_name: res.job,
        //     email: "nothing@nodomain.found"
        // })
        // toast.success("Create user successfully!")
        // resetState()
        // handleClose()
        // console.log(">>>check data res: ", res)
    }

    const resetState = () => {
        setName("")
        setJob("")
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