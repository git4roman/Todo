import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.main`
  max-width: 800px; /* Set a max-width or width */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
`;

const Home = () => {
  return (
    <Wrapper>
      <Link to="/todo">Have Todos?</Link>
    </Wrapper>
  );
};

export default Home;
