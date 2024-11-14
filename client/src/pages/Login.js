import styled from "styled-components";
import FormRow from "../components/FormRow";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuthContext } from "../context/authContext";

const Wrapper = styled.main`
  max-width: 400px;
  margin: 60px auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 10px;
  padding: 0;

  &:hover {
    color: #0056b3;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };
  const [values, setValues] = useState(initialState);
  const { loginFunc } = useAuthContext();
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
    navigate("/register");
  };
  const handleInput = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    loginFunc({
      email: values.email,
      password: values.password,
    });
    // navigate("/");
  };
  return (
    <Wrapper>
      <Logo />
      <h1>{values.isMember ? "Hey,Login" : "Register Yourself"}</h1>
      <div className="form">
        <Form onSubmit={onSubmit}>
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              labelText="Name"
              value={values.name}
              handleChange={handleInput}
            />
          )}
          <FormRow
            type="text"
            name="email"
            labelText="Email"
            value={values.email}
            handleChange={handleInput}
          />
          <FormRow
            type="password" // Changed to "password" for secure input
            name="password"
            labelText="Password"
            value={values.password}
            handleChange={handleInput}
          />
          <Button type="submit">Submit</Button>

          <p>
            {!values.isMember ? "Already a Member? " : "Not a Member yet? "}
            <ToggleButton type="button" onClick={toggleMember}>
              {!values.isMember ? "Login" : "Register"}
            </ToggleButton>
          </p>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Register;
