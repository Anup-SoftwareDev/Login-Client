
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Secured from './components/Secured';
import axios from "axios";

function App() {
  const {loginWithPopup, 
        loginWithRedirect, 
        logout, 
        user, 
        isAuthenticated,
        getAccessTokenSilently
      } = useAuth0();
      
    function callApi(){
      console.log(process.env.REACT_APP_BASE_URL)
      axios.get(process.env.REACT_APP_BASE_URL)
           .then (response => console.log(response.data))
           .catch(error=> console.log(error.message))
    }

    async function callProtectedApi(){
      try {
      const token = await getAccessTokenSilently();
      console.log(token)
      const response = await axios.get(process.env.REACT_APP_PROTECTED_URL,{
        headers:{
          authorization: `bearer ${token}`
        }
      })
      console.log(response.data)
    }catch(error){
      console.log(error.message)
    }
     
    }


  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={

            <div className="App" style ={{display: 'flex', flexDirection: 'column', marginLeft: '40%', marginTop: '50px', width: '100px'}}>
            <h4>Login/Logout Test</h4>
            {isAuthenticated?
                    <>
                      <h2>User is Logged In</h2> 
                      <button onClick={logout}>Logout</button>
                      {/*<h4>{JSON.stringify(user, null, 2)}</h4>*/}
                    </>
              :
                    <> 
                      <h2>User is Not Logged In</h2>
                      <button onClick={loginWithPopup}>Login</button>
                      
                    </>              
            }
            <button style={{marginTop: '10px'}} onClick={callApi}>Call Api Route</button>
            <button style={{marginTop: '10px'}} onClick={callProtectedApi}>Call Protected Api Route</button>
            <Link to="/secured">Secured</Link>
            </div>
        }/>       
        <Route path="/secured" element={isAuthenticated?<Secured/>:
          <> 
            <h2>User is Not Logged In</h2>
            <button onClick={loginWithPopup}>Login</button>
          </>            
        }/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
