import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Login from './Login.jsx'
import './index.css'
// import SignInSignUp from './SignInSignUp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> 
   
    <SignInSignUp /> */}

    <Login />
  </StrictMode>,
)
