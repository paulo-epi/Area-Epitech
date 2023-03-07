import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isGithubLoggedIn, isGoogleLoggedIn, isLoggedIn } from "../SetupRecoil";
import ErrorButton from "./ErrorButton";

export default function LogoutButton() {
  const setIsLogged = useSetRecoilState(isLoggedIn);
  const setGithubLoggedIn = useSetRecoilState(isGithubLoggedIn);
  const setGoogleLoggedIn = useSetRecoilState(isGoogleLoggedIn);
  const handleLogout = () => {
    setIsLogged(false);
    setGithubLoggedIn(false);
    setGoogleLoggedIn(false);
  };

  return (
    <Link to="/login">
      <ErrorButton title="Logout" handleClick={handleLogout} />
    </Link>
  );
}
