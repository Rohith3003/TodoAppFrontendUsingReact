import {useParams, Link} from 'react-router-dom';
import { useState } from 'react';
import { retrieveHelloWorldWithPV } from '../api/HelloWorldService';

export default function WelcomeComponent() {

   const [response, setResponse] = useState(null);

   function callHelloWorldBeanApi() {
    retrieveHelloWorldWithPV('Rohith')
      .then((response) => successResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log('clean Up'))
   }

   function successResponse(response) {
    setResponse(response.data.message);
    console.log(response);
   }

   function errorResponse(error) {
    console.log(error);
   }

    let {username} = useParams();
  
    return (
      <div className='WelcomeComponent'>
        <h1>Hi {username}</h1>
        <h2>Organize your work and life, finally.</h2>
        <div>Manage your todos <Link to='/todos'>here</Link></div>
        <div>
          <button onClick={callHelloWorldBeanApi} className='btn btn-success m-5'>Call Hello World Bean</button>
        </div>
        <div className='text-info'>
          {response}
        </div>
      </div>
    )
  }