import { Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ActionTable from "../components/ActionTable/ActionTable";
import LogoutButton from "../components/LogoutButton";
import OAuthButtons from "../components/OAuthButtons/OAuthButtons";
import { FetchIt } from "../utils/FetchIt";

export interface IAction {
  id: number;
  name: string;
  desc: string;
  service_id: number;
}

export default function Home() {
  const [actions, setActions] = useState<IAction[]>([]);
  const [reactions, setReactions] = useState<IAction[]>([]);

  const handleGetActionsOnSuccess = (data: (string | number)[][]) => {
    FetchIt({
      route: "get_reactions",
      method: "GET",
      strFormBody: "",
      onSuccess: handleGetReactionsOnSuccess,
      onError: () => {},
      jwtToken: "",
    });
    const actions: IAction[] = [];
    data.forEach((action) => {
      actions.push({
        id: action[0] as number,
        name: action[1] as string,
        desc: action[2] as string,
        service_id: action[3] as number,
      });
    });
    setActions(actions);
    console.log(actions);
  };

  const handleGetReactionsOnSuccess = (data: (string | number)[][]) => {
    const reactions: IAction[] = [];
    data.forEach((reaction) => {
      reactions.push({
        id: reaction[0] as number,
        name: reaction[1] as string,
        desc: reaction[2] as string,
        service_id: reaction[3] as number,
      });
    });
    setReactions(reactions);
    console.log(reactions);
  };

  useEffect(() => {
    FetchIt({
      route: "get_actions",
      method: "GET",
      strFormBody: "",
      onSuccess: handleGetActionsOnSuccess,
      onError: () => {},
      jwtToken: "",
    });
  }, []);

  return (
    <HomeWrapper>
      <Col span={24}>
        <Row justify="center" align="middle">
          <OAuthButtons />
        </Row>
      </Col>
      <Col span={24}>
        <Row justify="center">
          <TableCol span={22}>
            {actions.length > 0 && reactions.length > 0 ? (
              <ActionTable actions={actions} reactions={reactions} />
            ) : (
              <StyledLoading>
                <div>Chargement en cours</div>
                <Spin />
              </StyledLoading>
            )}
          </TableCol>
        </Row>
      </Col>
      <Col span={24}>
        <PaddingWrapper justify="center">
          <LogoutButton />
        </PaddingWrapper>
      </Col>
    </HomeWrapper>
  );
}

const TableCol = styled(Col)`
  background: white;
  border-radius: 10px;
`;

const HomeWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: #22272e;
  color: white;
`;

const PaddingWrapper = styled(Row)`
  padding: 10px;
`;

const StyledLoading = styled.h2`
  width: 100%;
  text-align: center;
  color: black;
`;
