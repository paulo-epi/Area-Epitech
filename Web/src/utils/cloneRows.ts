import cloneDeep from "lodash/cloneDeep";
import { DataType } from "../components/ActionTable/addNewData";

export function cloneRows(rows: DataType[]): DataType[] {
  let newRows = cloneDeep(rows).map((row) => {
    return {
      ...row,
      reactions: {
        ...row.reactions,
        inputs: row.reactions.inputs.map((input) => {
          return {
            ...input,
            values: cloneDeep(input.values),
          };
        }),
      },
      actions: {
        ...row.actions,
        inputs: row.actions.inputs.map((input) => {
          return {
            ...input,
            values: cloneDeep(input.values),
          };
        }),
      },
    };
  });
  return newRows;
}
