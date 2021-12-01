import styles from './Login.module.scss';
import { useState } from 'react';

const Login = (props) => {
  const [details, setDetails] = useState({username:"",password:""});

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(details.username + ", " + details.password);
    if(details.username === "" || details.password ==="") alert("Please fill in the login form")
    props.setUserHandler(details.username);
      /*else{
        const response = await axios.post('/loginUser', {
          username: details.username,
          password: details.password,
        });
        // set the state of the user
        props.stateHandler(response.data);
        console.log(response.data);
          if(response.data['result']==="Success"){
            sessionStorage.setItem("logged_user", JSON.stringify(response.data));
          }
          else{
            alert("Failed to log in, wrong credentials")
          }*/
  }

  return (
    <div className={styles.Login}>
      <header><b>Login</b></header><br></br>
      <form onSubmit={handleSubmit}>
        <p><b>Username</b></p><br></br>
        <input type="text" onChange={e => setDetails({...details ,username: e.target.value})} value={details.username}/>
        <p><b>Password</b></p><br></br>
        <input type="password" onChange={e => setDetails({...details ,password: e.target.value})} value={details.password}/>
        <input type="submit" value="Log in"/>
      </form><br></br>
    </div>
    
  );
};

export default Login;
