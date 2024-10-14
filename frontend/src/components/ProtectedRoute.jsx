import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import React from 'react'




//need to check if user is authorized before they can access this url route
//children, is the component within the ProtectedRoute componenet in for example App.js
export default function ProtectedRoute({children}){
    const [isAuthorized, setAuthorized] = React.useState(null)


    //when we load a protected route
    React.useEffect(() =>{
        //when we first load the protected rout, call the auth function from below to see if we a valid token
        //if we get an error we deal with it here by setting authorized to false
        auth().catch(() => setAuthorized(false))
    }, [] )

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);//getting refresh token

        try{//send request to backend with refresh token to get new access token
            //await api.post(root, payload)
            //only have to pass the root url, not the base url as the api adds the baseUrl (seen in api.js)
            const response = await api.post('/api/token/refresh/', {refresh: refreshToken })//

            if(response.status === 200){//if response was successful
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setAuthorized(true)
            } else{
                setAuthorized(false)
            }
        }
        catch(error){
            setAuthorized(false)
            console.log(error)
        }

    }

    //checks if we need to refresh function or if it is valid
    const auth = async () =>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token){//if token doesn't exist, then not authorized
            setAuthorized(false);
            return
        } else{//if token does exist, decode it
            const decodedToken = jwtDecode(token);
            const expiration = decodedToken.exp
            const now = Date.now / 1000
            
            if(expiration < now){//if token expired, then refresh it
                await refreshToken()
            } else{//if token is not expired, authorize the user
                setAuthorized(true)
            }
        }
    }

    if(isAuthorized === null){
        return(
            <div>
                LOADING...
            </div>
        )
    }

    //if user is authorized, then return the children, if not, navigate/send them to login page
    return isAuthorized ? children : <Navigate to='/login'/>
}

