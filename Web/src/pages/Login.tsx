import styled from "styled-components";
import { Row, Col, Modal } from "antd";
import { colors } from "../utils/colors";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Title from "../components/Title";
import IconInput from "../components/IconInput";
import LinkTextFooter from "../components/LinkTextFooter";
import { useEffect, useState } from "react";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedIn, isRegistered, JwtToken } from "../SetupRecoil";
import ErrorText from "../components/ErrorText";
import { createUserFormBody } from "../utils/createFormBodies";
import { FetchIt } from "../utils/FetchIt";

interface ResponseData {
  success: boolean;
  token: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const setJwt = useSetRecoilState(JwtToken);
  const setIsLoggedIn = useSetRecoilState(isLoggedIn);
  const [didUserJustRegistered, setIsRegistered] = useRecoilState(isRegistered);
  const [isModalOpen, setIsModalOpen] = useState(didUserJustRegistered);

  useEffect(() => {
    setIsRegistered(false);
  }, [setIsRegistered]);

  async function handleOnSubmit(e: React.FormEvent) {
    setError("");
    e.preventDefault();
    setIsLoading(true);
    let details = {
      email: email,
      password: password,
    };
    let strFormBody: string = createUserFormBody(details);
    const handleOnSuccess = (data: ResponseData) => {
      if (data.success) {
        const token = data.token;
        console.log(token);
        setJwt(token);
        setIsLoggedIn(true);
        navigate("/");
        setIsLoading(false);
      } else {
        setError("This account does not exist");
        setIsLoading(false);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    };
    const handleOnError = () => {
      console.log(error);
      setIsLoading(false);
      setError("There is an error with the server :(");
      setTimeout(() => {
        setError("");
      }, 2000);
    };
    FetchIt({
      route: "login",
      method: "POST",
      strFormBody: strFormBody,
      onSuccess: handleOnSuccess,
      onError: handleOnError,
      jwtToken: "",
    });
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <LoginWrapper>
      <Modal
        title="Your account has been successfully created. You can log in."
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
      />
      <Row>
        <Col span={24}>
          <Title title="Sign in" />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "100px" }}>
        <Col span={4}>
          <form onSubmit={handleOnSubmit}>
            <div style={{ justifyContent: 'center', color: '#666' }}>
              <p>Enter your credentials to access to your account.</p>
            </div>
            <Row>
              <Col span={24}>
                <IconInput
                  name="email"
                  id="email"
                  icon={<MailOutlined />}
                  type="email"
                  placeholder="Email"
                  required
                  set={setEmail}
                />
              </Col>
              <Col span={24}>
                <IconInput
                  name="password"
                  id="password"
                  icon={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                  required
                  set={setPassword}
                />
              </Col>
              <ErrorText title={error} />
            </Row>
            <SubmitButton title="Sign in" loading={isLoading} />
          </form>
          <LinkTextFooter
            text="Don't have an account?"
            linkText="Sign up"
            link="/register"
          />
        </Col>
      </Row>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  height: 100vh;
  background: ${colors.black};
`;
