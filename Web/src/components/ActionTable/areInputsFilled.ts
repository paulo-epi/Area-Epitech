import { DataType } from "./addNewData";

export function areInputsFilled(
  row: DataType,
  setError: React.Dispatch<React.SetStateAction<string>>
): boolean {
  const action_id = row.actions.id;
  const reaction_id = row.reactions.id;

  for (const input of row.actions.inputs) {
    if (input.id === action_id) {
      let titleIndex = 0;
      for (const value of input.values) {
        if (value === "") {
          setError(
            `Please fill all the inputs of "${input.name}" (input "${input.titles[titleIndex]}" not filled)`
          );
          return false;
        }
        titleIndex += 1;
      }
    }
  }
  for (const input of row.reactions.inputs) {
    if (input.id === reaction_id) {
      let titleIndex = 0;
      for (const value of input.values) {
        if (value === "") {
          setError(
            `Please fill all the inputs of "${input.name}" (input "${input.titles[titleIndex]}" not filled)`
          );
          return false;
        }
        titleIndex += 1;
      }
    }
  }

  return true;
}
