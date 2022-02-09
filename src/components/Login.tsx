import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {user} from "../assets/users";
import {admin} from "../assets/users";
function Login() {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredPassWord, setEnteredPassword] = useState("");
  const navigate = useNavigate();

  const handleLogIn = () => {
    if (!enteredUserName || !enteredPassWord) { 
      window.alert("Enter userName & Password to login")

      return;
    }

    user.map((user) => {
      return user.userName === enteredUserName &&
        user.passWord === enteredPassWord && user.role === 'user'
        ? success()
        : window.alert("failed");
    });

   if(admin.userName === enteredUserName && admin.passWord === enteredPassWord && admin.role === 'admin'){
     navigate('/createProduct');
   }
  };

  const success = () => {
    setEnteredPassword("");
    setEnteredUserName("");
    window.alert("login success");
    localStorage.removeItem('cart')
    sessionStorage.setItem("Role", "user");
    navigate('/')
  };

  const handleLogout = () => {
    sessionStorage.removeItem("Role")
    sessionStorage.removeItem("User")
    window.alert('logged out successfully!')
  }
  return (
    <Form>
      <h3>LOGIN</h3>
      <Label htmlFor="">username</Label>
      <Input
        type="text"
        placeholder="userName"
        onChange={(e) => setEnteredUserName(e.target.value)}
      />
      <Label htmlFor="">Password</Label>
      <Input
        type="password"
        placeholder="passWord"
        onChange={(e) => setEnteredPassword(e.target.value)}
      />
      <Button onClick={handleLogIn}>SIGN IN</Button>
      <Button onClick={handleLogout}>SIGN OUT</Button>
    </Form>
  );
}

export default Login;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  border: 1px solid white;
`;
const Label = styled.label`
  font-size: 1rem;
  width: 200px;
`;
const Input = styled.input`
  width: 200px;
`;
const Button = styled.button``;
