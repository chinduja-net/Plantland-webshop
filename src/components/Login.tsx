import { useState } from "react";
import styled from "styled-components";
import user from "../assets/users";

function Login() {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredPassWord, setEnteredPassword] = useState("");

  const handleLogIn = () => {
    if (!enteredUserName || !enteredPassWord) {
      return;
    }

    user.map((user) => {
      return user.userName === enteredUserName &&
        user.passWord === enteredPassWord
        ? success()
        : window.alert("failed");
    });
  };

  const success = () => {
    setEnteredPassword("");
    setEnteredUserName("");
    window.alert("login success");
        sessionStorage.setItem("Token", "user");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("Token")
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
