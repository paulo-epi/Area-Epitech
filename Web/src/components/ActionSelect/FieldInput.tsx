import { Input } from "antd";
import styled from "styled-components";
import {
  defaultActionInputs,
  defaultReactionInputs,
} from "../../utils/variables";
import { getInputValueFromIdAndTitle } from "./getInputValueFromIdAndTitle";

interface IFieldInputProps {
  id: string;
  row_id: string;
  inputs: IInput[];
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

export interface IInput {
  id: string;
  name: string;
  titles: string[];
  ids: string[];
  values: string[];
}

export default function FieldInput(props: IFieldInputProps) {
  const defaultInputs = props.action
    ? defaultActionInputs
    : defaultReactionInputs;

  const el = defaultInputs.find((el) => el.id === props.id);

  // FIXME : when data loaded from /areas request,
  // FIXME: input is empty even if there is a value (until we select it again)

  return (
    <div>
      {el &&
        el.titles.length > 0 &&
        el.titles.map((title, index) => (
          <InputWrapper key={`${index} - ${title}`}>
            {title}
            <Input
              id={`input-${title}-${props.id}`}
              value={
                props.inputs.length > 1
                  ? getInputValueFromIdAndTitle(props.inputs, props.id, title)
                  : ""
              }
              onChange={(e) =>
                props.handleOnChange(
                  e,
                  title,
                  props.id,
                  props.row_id,
                  props.action
                )
              }
              disabled={props.active}
            />
          </InputWrapper>
        ))}
    </div>
  );
}

const InputWrapper = styled.div`
  margin-top: 10px;
`;
