import { ColumnsType } from "antd/es/table";
import { JsxType } from "./getData";

export function getColumns(): ColumnsType<JsxType> {
  const columns: ColumnsType<JsxType> = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Reaction",
      dataIndex: "reaction",
      key: "reaction",
    },
    {
      title: "Active?",
      dataIndex: "active",
      key: "active",
    },
    {
      title: "Enable?",
      dataIndex: "activate",
      key: "activate",
    },
  ];
  return columns;
}
