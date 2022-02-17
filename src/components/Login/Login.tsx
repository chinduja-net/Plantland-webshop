import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PropsUser } from "../../assets/props";
import { admin, user } from "../../assets/users";

function Login() {
  const navigate = useNavigate();
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredPassWord, setEnteredPassword] = useState("");
 

  const handleLogIn = (e: any) => {
    e.preventDefault();
    if (!enteredUserName || !enteredPassWord) {
      window.alert("Enter userName & Password to login");

      return;
    }

    user.map((user: PropsUser) => {
      return user.userName === enteredUserName &&
        user.passWord === enteredPassWord &&
        user.role === "user"
        ? success()
        : admin.userName === enteredUserName &&
          admin.passWord === enteredPassWord &&
          admin.role === "admin"
        ? navigate("/createProduct")
        : window.alert("login Failed");
    });
  };

  const success = () => {
    setEnteredPassword("");
    setEnteredUserName("");
    localStorage.removeItem("cart");
    localStorage.removeItem("counter");
    sessionStorage.setItem("Role", "user");
    navigate("/");
  };

  return (
    <>
      <Form action="submit">
        <Title>LOGIN</Title>
        <Label htmlFor="">username</Label>
        <Input
          type="text"
          placeholder="username"
          onChange={(e) => setEnteredUserName(e.target.value)}
        />
        <Label htmlFor="">Password</Label>
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
        <Div>
          <Button
            disabled={!enteredUserName || !enteredPassWord}
            onClick={handleLogIn}
          >
            SIGN IN
          </Button>
        </Div>
      </Form>
    </>
  );
}

export default Login;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 500px;
  border: 1px dashed #3a6b35;
`;
const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: #3a6b35;
  text-transform: uppercase;
`;
const Label = styled.label`
  display: flex;
  font-size: 0.9rem;
  text-transform: uppercase;
  width: 300px;
`;
const Input = styled.input`
  width: 300px;
`;
const Button = styled.button`
  font-size: 1rem;
  text-align: center;
  text-transform: uppercase;
  display: inline-block;
  background-color: #cbd18f;
  border-radius: 3px;
  border: 1.5px solid #3a6b35;
  cursor: pointer;
  width: 100px;
`;
const Div = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px;
`;
