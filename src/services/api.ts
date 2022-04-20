import axios from 'axios';

export const api = axios.create({
    baseURL:'http://localhost:3000/api'
});


//https://api.imgbb.com/1/upload