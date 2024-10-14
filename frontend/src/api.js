//creating an interceptor, this intercepts any request and adds the relevant headers needed 
//so that we don't need to manually write them
//using axios to make this

import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const api = axios.create({
    //creating base url that this axios, url will prepend to requests
    //for example, if VITE_API_URL = https://api.example.com and you do a request like api.get('/notes)
    //this axios will prepend the baseUrl and send a GET request to https://api.example.com/notes
    //in this project, VITE_API_URL is seen in .env folder
    //all we need to do now, is specify the path we want not the baseURL
    baseURL: import.meta.env.VITE_API_URL

})

//registered functions below will run every time request is made
api.interceptors.request.use(
    (config)=>{//config is all the configuration settings of the http request that's been intercepted
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            //if the token exists, then we add the token with 'Bearer' to the header 
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>{
        console.log('error intercepting')
        return Promise.reject(error);
    }

)

export default api