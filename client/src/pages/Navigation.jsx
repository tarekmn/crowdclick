import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";

const Navigation = (props) => {
  const [signedIn, setsignedIn] = useState(true);

  const { appState, logout } = useAppContext();

  const logOutFunction = () => {
    logout();
  };

  useEffect(() => {
    if (!appState || !appState.user) {
      setsignedIn(false);

      console.log(signedIn);
    }
  }, [appState]);

  console.log(signedIn);

  return (
    <>
      <Nav id="navBar" className="justify-content-end">
        <Nav.Item>
          <Nav.Link
            onClick={() => props.setCurrSection("home")}
            id={props.currSection === "home" ? "selectedPage" : "nav-link"}
            href="/"
          >
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => props.setCurrSection("friends")}
            id={props.currSection === "friends" ? "selectedPage" : "nav-link"}
            href="/friends"
          >
            Friends
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/profile"
            onClick={() => props.setCurrSection("profile")}
            id={props.currSection === "profile" ? "selectedPage" : "nav-link"}
          >
            Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {!signedIn && (
            <Nav.Link
              href="/login"
              onClick={() => props.setCurrSection("login")}
              id={props.currSection === "login" ? "selectedPage" : "nav-link"}
            >
              Login
            </Nav.Link>
          )}

          {signedIn && <Nav.Link onClick={logOutFunction}>Logout</Nav.Link>}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Navigation;
