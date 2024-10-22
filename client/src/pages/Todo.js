import CreateTodo from "./dashboard/CreateTodo.js";
import DisplayTodo from "./dashboard/DisplayTodo.js";
import Table from "./dashboard/Table.js";
import styled from "styled-components";
const Todo = () => {
  const Wrapper = styled.section`
    max-width: 800px;
    height: 90vh;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    h1 {
      text-align: center;
    }
    .element {
      margin-bottom: 60px;
    }
  `;
  return (
    <Wrapper>
      <div className="CreateTodo element">
        <CreateTodo />
      </div>
      <div className="DisplayTodo element">
        <DisplayTodo />
      </div>
    </Wrapper>
  );
};
export default Todo;
