import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const FormRow = ({ labelText, name, type, value, handlechange }) => {
  return (
    <Wrapper className="form-row">
      <label htmlFor={name}>{labelText || name}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handlechange}
        className="form-input"
      />
    </Wrapper>
  );
};
export default FormRow;
