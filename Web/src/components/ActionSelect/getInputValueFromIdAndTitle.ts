import { IInput } from "./FieldInput";

export function getInputValueFromIdAndTitle(
  inputs: IInput[],
  id: string,
  title: string
) {
  const element = inputs.find((el) => el.id === id);

  if (element) {
    let titleIndex = 0;
    element.titles.forEach((el, index) => {
      if (el === title) {
        titleIndex = index;
      }
    });
    return element.values[titleIndex];
  }
  return "";
}
