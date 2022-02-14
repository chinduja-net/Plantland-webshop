import { Link } from "react-router-dom";
import styled from "styled-components";
import { Home } from "@styled-icons/heroicons-solid";

function BottomNav() {
  return (
    <Div role="div">
      <Link to="/">
        <Home data-testid="svg-element" size="36" color="#3a6b35" />
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

{
  /* <Div>
      <a href = "/"> <Home data-testid = "home" size="36" color="#3a6b35" /></a>
    </Div> */
}
