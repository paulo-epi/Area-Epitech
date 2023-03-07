import { Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { IAction } from "../../pages/Home";
import {
  isGithubLoggedIn,
  isGoogleLoggedIn,
  JwtToken,
} from "../../SetupRecoil";
import { getColumns } from "./getColumns";
import { DataType } from "./addNewData";
import { getData } from "./getData";
import { getAreas } from "./getAreas";
import styled from "styled-components";

interface IActionTableProps {
  actions: IAction[];
  reactions: IAction[];
}

export default function ActionTable(props: IActionTableProps) {
  const [rows, setRows] = useState<DataType[]>([]);
  const jwtToken = useRecoilValue(JwtToken);
  const [error, setError] = useState("");
  const isGoogleConnected = useRecoilValue(isGoogleLoggedIn);
  const isGithubConnected = useRecoilValue(isGithubLoggedIn);

  useEffect(() => {
    getAreas({
      jwtToken,
      setRows,
      actions: props.actions,
      reactions: props.reactions,
    });
  }, []);

  return (
    <>
      <Modal
        title="Error :"
        open={error !== ""}
        onOk={() => {
          setError("");
        }}
        onCancel={() => {
          setError("");
        }}
      >
        <StyledModalMessage>{error}</StyledModalMessage>
      </Modal>
      <Table
        columns={getColumns()}
        dataSource={getData({
          rows,
          actions: props.actions,
          reactions: props.reactions,
          setRows,
          setError,
          jwtToken,
          isGoogleConnected,
          isGithubConnected,
        })}
      />
    </>
  );
}

const StyledModalMessage = styled.div`
  color: #e36600;
  font-size: 1.5rem;
  width: 80%;
`;
