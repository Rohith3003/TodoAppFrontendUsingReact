import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { createTodo, retrieveTodo, updateTodo } from "../api/TodoApiService"
import { useAuth } from "../security/AuthContext";
import {Formik, Form, Field, ErrorMessage} from 'formik'


export default function TodoComponent() {

    const [description, setDescription] = useState('');

    const [targetDate, setTargetDate] = useState('');

    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => renderTodo, [id])

    const AuthContext = useAuth();
    const username = AuthContext.username;
    
    function renderTodo() {
        if(id !== -1) {
            retrieveTodo(username, id)
            .then((response) => {setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch((error) => console.log(error))
        }
    }

    function update(data) {
        const todo = {
            id: id,
            username: username,
            description: data.description,
            targetDate: data.targetDate,
            done: false
        }
        if(id === -1) {
            createTodo(username, todo)
            .then((response) => {
                navigate('/todos')
            })
            .catch((error) => console.log(error))
        } else {
            updateTodo(username, id, todo)
            .then((response) => {
                navigate('/todos')
            })
            .catch((error) => console.log(error))
        }
    }

    function validate(data) {
        let errors = {}
        if(data.description.length<5) {
            errors.description='Description must be greater than 5 characters'
        }
        return errors
    }

    return (
        <div>
            <h1>Enter/Update your Todo Details</h1>
            <Formik initialValues={{description, targetDate}} 
                enableReinitialize = {true}
                onSubmit={update}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name='description'
                                component='div'
                                className='alert alert-warning'
                            />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description" ></Field>
                            </fieldset>
                            <fieldset className="form-group"> 
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate"></Field>
                            </fieldset>
                            <div>
                                <button className='btn btn-success m-3' type='submit'>Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}