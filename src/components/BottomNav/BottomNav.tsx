import { Link } from "react-router-dom";
import styled from "styled-components";
import { Home } from "@styled-icons/heroicons-solid";

function BottomNav() {
  return (
    <Div>
      <Link to="/" data-testid="svg-element">
        <Home  size="36" color="#3a6b35" />
      </Link>
    </Div>
  );
}

export default BottomNav;
const Div = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
  justify-items: space-evenly;
  align-items: center;
  margin-top: 15px;
`;

