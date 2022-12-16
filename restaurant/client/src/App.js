import './App.css';
import {Route, Routes, Navigate, BrowserRouter as Router} from 'react-router-dom';
import RestaurantTable from './components/RestaurantList';
import EditRestaurant from './components/EditRestaurant';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
    return (
        <div className="container card mb-4 box-shadow">

            <div className="card-header">
                <h4 className="my-0 font-weight-normal">Test</h4>
            </div>

            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/read" />} />
                    <Route exact path="/read" element={<RestaurantTable />} />
                    <Route exact path="/edit/:id" element={<EditRestaurant />} />
                </Routes>
            </Router>

        </div>
    );
}

export default App;
