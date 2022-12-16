import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {Form, Button, Container, Alert} from 'react-bootstrap';

const EditRestaurant = () => {

    const editURL = "http://localhost:8080/restaurant/";
    const navigate = useNavigate();
    const param = useParams();
    const [resId, setResId] = useState('');
    const [rating, setRating] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        axios.get(editURL + param.id).then((response) => {
            const resData = response.data;
            console.log(resData)
            setResId(resData.id);
            setRating(resData.stars);
            setTitle(resData.title);
            setLocation(resData.location);
        }).catch(error => {
            alert("Error Ocurred getting employee detail:" + error);
        });
    }, []);



    const ratingChangeHandler = (event) => {
        setRating(event.target.value);
    };


    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
            .put(editURL + param.id, {
                id: resId,
                rating: rating
            })
            .then((response) => {
                alert("Employee " + resId + " updated!");
                navigate('/read')

            }).catch(error => {
                alert("Error Ocurred updating employee:" + error);
            });

    };

    return (
        <Alert variant='primary'>
            <Container>
                <Form onSubmit={submitActionHandler} id="data">
                    <Form.Group controlId="form.id">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" value={resId} readOnly />
                    </Form.Group>
                    <Form.Group controlId="form.Name">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} readOnly />
                    </Form.Group>
                    <Form.Group controlId="form.stars">
                        <Form.Label>Stars</Form.Label>
                        <Form.Control type="number" value={rating} onChange={ratingChangeHandler} required />
                    </Form.Group>
                    <br></br>
                    <Button type='submit'>Update Employee</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type='submit' onClick={() => navigate("/read")}>Cancel</Button>
                </Form>
            </Container>
        </Alert>

    );
}
export default EditRestaurant;
