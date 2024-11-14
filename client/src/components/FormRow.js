import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  max-width: 400px;
  width: 100%;
  margin-bottom: 16px; /* Optional: Adds spacing between form rows */

  .form-label {
    margin-bottom: 8px;
    font-size: 1rem; /* Optional: Adjusts label size */
  }

  .form-input {
    width: 100%;
    padding: 12px 16px; /* Increases input padding */
    font-size: 1.1rem; /* Increases text size */
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff; /* Optional: Changes border color on focus */
    }
  }
`;

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <Wrapper className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </Wrapper>
  );
};

export default FormRow;
