import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";
import { useAppContext } from "../context/appContext";
import { useAuthContext } from "../context/authContext";
// import { ToastContainer, toast } from "react-toastify";
import Toast from "../components/Toast";

const Wrapper = styled.main`
  width: 80vw;
  height: 80vh;
  margin: 60px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  h4 {
    margin-bottom: 20px;
    font-style: italic;
    color: #555;
  }

  p {
    text-align: start;
    margin: 20px;
    max-width: 600px;
    line-height: 1.5;
    color: #333;
  }

  .links {
    margin-top: 20px;

    a {
      margin: 10px;
      text-decoration: none;
      color: #000;
      border: 1px solid black;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: all 0.3s ease;
      background-color: #fff;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);

      &:hover {
        background-color: #007bff;
        color: #fff;
        border-color: #007bff;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
      }
    }
  }
`;

const Landing = () => {
  return (
    <Wrapper>
      <Toast />
      <h1 style={{ display: "flex", gap: "10px" }}>
        <Logo /> Todo
      </h1>
      <h4 style={{ marginBottom: "20px", fontStyle: "italic" }}>
        non-commercial Website
      </h4>
      <p style={{ textAlign: "start", margin: "20px" }}>
        Organize your tasks, manage your time, and stay on top of your goals
        with our simple and user-friendly platform. Whether you're tackling
        personal projects or managing team tasks, Todo Central helps you
        prioritize what matters.
      </p>
      <div className="links">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </Wrapper>
  );
};

export default Landing;
