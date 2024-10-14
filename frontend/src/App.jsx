import React from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from './pages/Login'
import Home from "./pages/Home"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"


function Logout(){
  localStorage.clear();
  return <Navigate to='/login'/>
}

function RegisterAndLogout(){
  localStorage.clear();//if someone is trying to register clear the old access tokens
  return <Register/>
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route  //if just / path i.e. normal path go to home
        path='/'
        element ={
          //having home in protectedroute means that we can only access home page if 
          //we're already authorised
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        />
        <Route 
          path='/login'
          element = {<Login />}
        />
        <Route 
          path='/logout'
          element={<Logout />}
        />
        <Route 
          path='/register'
          element = {<RegisterAndLogout />}
        />
        <Route 
          path='*' //if any other path not specified above, go to NotFound page i.e. error page
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
