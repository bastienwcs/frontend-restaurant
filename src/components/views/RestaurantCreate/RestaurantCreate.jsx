import React, { useContext, useState } from 'react';
import axios from 'axios';
import { findAll } from '../../../services/RestaurantApi';
import { RestaurantContext } from '../../../contexts/RestaurantContext';

function RestaurantCreate() {
  const [restaurant, setRestaurant] = useState({ name: '', city: '' });
  const { setRestaurants } = useContext(RestaurantContext);

  const submit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/restaurants', restaurant).then(
      (response) => {
        console.log(response);
        findAll((result) => {
          setRestaurants(result);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const change = (event) => {
    setRestaurant({
      ...restaurant,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={submit}>
      <label>
        <span>Restaurant's name:</span>
        <input type='text' name='name' onChange={change} />
      </label>
      <label>
        <span>Restaurant's city:</span>
        <input type='text' name='city' onChange={change} />
      </label>
      <input type='submit' value='Send' />
    </form>
  );
}

export default RestaurantCreate;
