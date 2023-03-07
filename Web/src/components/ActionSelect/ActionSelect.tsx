import { Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { indexOf } from "cypress/types/lodash";
import styled from "styled-components";
import FieldInput, { IInput } from "./FieldInput";

interface ActionSelectProps {
  options: string[];
  descs: string[];
  id: string;
  chosen: string;
  i: number;
  inputs: IInput[];
  handleOnSelect(i: number, chosen: string, action?: boolean): void;
  handleOnChange(
    e: React.ChangeEvent<HTMLInputElement>,
    title: string,
    id: string,
    row_id: string,
    action?: boolean
  ): void;
  action?: boolean;
  active?: boolean;
}

export default function ActionSelect(props: ActionSelectProps) {
  const options: SelectProps["options"] = props.options.map((option) => {
    const defOption: DefaultOptionType = {
      label: option,
      value: option,
    };
    return defOption;
  });

  return (
    <>
      <Select
        style={{ width: "300px" }}
        options={options}
        defaultValue={props.chosen}
        onSelect={(choice) =>
          props.handleOnSelect(props.i, choice, props.action)
        }
        disabled={props.active}
      />
      <StyledDesc>
        {props.descs[props.options.indexOf(props.chosen)]}
      </StyledDesc>
      <FieldInput
        row_id={props.i.toString()}
        id={props.id}
        inputs={props.inputs}
        action={props.action}
        handleOnChange={props.handleOnChange}
        active={props.active}
      />
    </>
  );
}

const StyledDesc = styled.div`
  color: #7171ff;
`;
