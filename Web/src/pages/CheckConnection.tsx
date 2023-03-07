import { useRecoilValue } from "recoil";
import { isLoggedIn } from "../SetupRecoil";
import Error from "./Error";

interface CheckConnectionProps {
  children: JSX.Element;
}

export default function CheckConnection(props: CheckConnectionProps) {
  const isUserLoggedIn = useRecoilValue(isLoggedIn);

  if (isUserLoggedIn) {
    return props.children;
  }
  return <Error />;
}
