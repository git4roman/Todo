import { useAuthContext } from "../context/authContext.js";
import CreateTodo from "./dashboard/CreateTodo.js";
import DisplayTodo from "./dashboard/DisplayTodo.js";
// import { ToastContainer } from "react-toastify";
import Toast from "../components/Toast.js";
import styled from "styled-components";

const Todo = () => {
  const Wrapper = styled.section`
    max-width: 800px;
    height: 100%;
    margin: 20px auto;
    h1 {
      text-align: center;
    }
    .element {
      margin-bottom: 60px;
    }
    .profile {
      display: flex;
      justify-content: center;
      margin-top: 40px;

      button {
        padding: 12px 24px;
        font-size: 16px;
        background-color: #4caf50; /* Green background */
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.3s ease;

        &:hover {
          background-color: #45a049; /* Darker green on hover */
          transform: translateY(-2px); /* Slightly lift the button */
        }

        &:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.5); /* Green shadow on focus */
        }

        &:active {
          transform: translateY(0); /* Button snaps back when clicked */
        }
      }
    }
  `;

  const { logOut } = useAuthContext();

  return (
    <Wrapper>
      {/* <Toast /> */}
      <div className="CreateTodo element">
        <CreateTodo />
      </div>
      <div className="DisplayTodo element">
        <DisplayTodo />
      </div>
      <div className="profile">
        <button onClick={logOut}>LogOut</button>
      </div>
    </Wrapper>
  );
};

export default Todo;
