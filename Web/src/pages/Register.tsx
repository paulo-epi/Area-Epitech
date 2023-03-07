import styled from "styled-components";
import { Row, Col } from "antd";
import { colors } from "../utils/colors";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Title from "../components/Title";
import IconInput from "../components/IconInput";
import LinkTextFooter from "../components/LinkTextFooter";
import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";
import ErrorText from "../components/ErrorText";
import { useSetRecoilState } from "recoil";
import { isRegistered } from "../SetupRecoil";
import { FetchIt } from "../utils/FetchIt";
import { createUserFormBody } from "../utils/createFormBodies";

export interface ResponseData {
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const setIsRegistered = useSetRecoilState(isRegistered);

  function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    if (password === confirmPassword && email !== "" && password !== "") {
      let details = {
        email: email,
        password: password,
      };
      let strFormBody: string = createUserFormBody(details);
      const handleOnSuccess = (data: ResponseData) => {
        if (data.email) {
          navigate("/login");
          setIsLoading(false);
          setIsRegistered(true);
        } else {
          setError("Error while registering");
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      }
      const handleOnError = () => {
        setIsLoading(false);
        setError("There is an error with the server :(");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
      FetchIt({ route: "register", method: "POST", strFormBody: strFormBody, onSuccess: handleOnSuccess, onError: handleOnError, jwtToken: "" })
    }
  }

  return (
    <LoginWrapper>
      <Row>
        <Col span={24}>
          <Title title="Register" />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "100px" }}>
        <Col span={4}>
          <form onSubmit={handleOnSubmit}>
            <div style={{ justifyContent: 'center', color: '#666' }}>
              <p>Enter your credentials to register your account.</p>
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
              <Col span={24}>
                <IconInput
                  name="confirmpassword"
                  id="confirmpassword"
                  icon={<LockOutlined />}
                  type="password"
                  placeholder="Confirm Password"
                  required
                  set={setConfirmPassword}
                />
              </Col>
              <ErrorText title={error} />
            </Row>
            <SubmitButton title="Sign up" loading={isLoading} />
          </form>
          <LinkTextFooter
            text="Already have an account?"
            linkText="Sign in"
            link="/login"
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
