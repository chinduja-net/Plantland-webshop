import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { user } from "../assets/users";
import { admin } from "../assets/users";
function Login() {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredPassWord, setEnteredPassword] = useState("");
  const navigate = useNavigate();

  const handleLogIn = () => {
    if (!enteredUserName || !enteredPassWord) {
      window.alert("Enter userName & Password to login");

      return;
    }

    user.map((user) => {
      return user.userName === enteredUserName &&
        user.passWord === enteredPassWord &&
        user.role === "user"
        ? success()
        : admin.userName === enteredUserName &&
          admin.passWord === enteredPassWord &&
          admin.role === "admin"
        ? navigate('/createProduct')
        : window.alert("login Failed");
    });
  };

 
  const success = () => {
    setEnteredPassword("");
    setEnteredUserName("");
    window.alert("login success");
    localStorage.removeItem("cart");
    sessionStorage.setItem("Role", "user");
    navigate("/");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("Role");
    sessionStorage.removeItem("User");
    localStorage.removeItem("products");
    localStorage.removeItem("cart");
    window.alert("logged out successfully!");
  };
  return (
    <Form>
      <Title>LOGIN</Title>
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
      <Div>
      <Button onClick={handleLogIn}>SIGN IN</Button>
      <Button onClick={handleLogout}>SIGN OUT</Button>

      </Div>
     
    </Form>
  );
}

export default Login;

const Form = styled.form`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  
`;
const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color:#3A6B35;
  text-transform: uppercase;
`;
const Label = styled.label`
  font-size: 1rem;
  width: 200px;
`;
const Input = styled.input`
  width: 200px;
`;
const Button = styled.button`
 font-size: 0.7rem;
  text-align: center;
  text-transform:uppercase;
  display: inline-block;
  background-color: #CBD18F;
  width: max-content;
  border-radius:3px;
  border: 1.5px solid #3a6b35;
  cursor: pointer;
`;
const Div = styled.div`
display:flex;
justify-content: space-around;
align-items:center;


`