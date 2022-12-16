import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import "../App.css";


const RestaurantTable = () => {

    const navigate = useNavigate();
    const baseURL = "http://localhost:8080";

    const [restaurants, setRestaurants] = useState([]);

    const fetchRestaurants = () => {
        axios.get(baseURL + "/restaurants").then((response) => {
            setRestaurants(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchRestaurants();
    }, []);


    const onChange = (e) => {
        if (e.target.value === "") {
            fetchRestaurants();
            navigate('/read')
        } else {
            const result = restaurants.filter(function (rest) {
                const title = rest.title;
                return title.includes(e.target.value)
            });
            setRestaurants(result);
        }
    }
    const removeRestaurant = (id) => {
        axios.delete(baseURL + "/restaurant/" + id).then((response) => {
            fetchRestaurants();
            navigate('/read')
        }).catch(error => {
            console.log("HERE")
        });
    }

    return (
        <div className="card-body">
            <br>
            </br>
            <nav>
            </nav>
            <div className="search">
                <input
                    type="text"
                    onChange={onChange}
                    placeholder="Search by the title ..."
                />
            </div>

            <br></br>
            <div className="col-md-6">
                <h4>RestaurantList List</h4>

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        restaurants &&
                                        restaurants.map((restaurant, index) => (

                                            <tr key={restaurant.id}>
                                                <th scope="row">{restaurant.id}</th>
                                                <td>{restaurant.title}</td>
                                                <td>{restaurant.location}</td>
                                                <td>{restaurant.stars}</td>
                                                <td >

                                                    <Link className='btn btn-primary' to={"/edit/" + restaurant.id}>
                                                        Edit
                                                    </Link>
                                                    <button className='btn btn-danger'
                                                        onClick={() => removeRestaurant(restaurant.id)} >
                                                        Delete
                                                    </button>

                                                </td>
                                            </tr>

                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div >

    );
}
export default RestaurantTable;
