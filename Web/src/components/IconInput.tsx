import { Col, Row } from "antd";
import styled from "styled-components";

interface IconInputProps {
  name: string;
  id: string;
  icon: JSX.Element;
  type?: string;
  placeholder?: string;
  required?: boolean;
  set: React.Dispatch<React.SetStateAction<string>>;
}

export default function IconInput(props: IconInputProps) {
  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    props.set(e.currentTarget.value);
  }

  return (
    <InputZone align="middle">
      <Col span={2}>
        <div style={{ fontSize: "20px" }}>{props.icon}</div>
      </Col>
      <Col span={22}>
        <StyledInput
          className="App-input"
          name={props.name}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          required={props.required}
          onChange={handleOnChange}
        />
      </Col>
    </InputZone>
  );
}

const InputZone = styled(Row)`
  color: white;
  background: transparent;
  border-bottom: solid;
  border-bottom-color: white;
  margin: 10px 0;
  padding: 5px;
`;

const StyledInput = styled.input`
  color: white;
  background: transparent;
  border: transparent;
  width: 100%;
  margin-left: 5px;
`;
