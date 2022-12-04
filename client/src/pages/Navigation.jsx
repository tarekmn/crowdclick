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
    }
  }, [appState]);

  let foo = window.location.href.split("/").pop();
  foo = foo === "" ? "home" : foo;

  return (
    <>
      <Nav id="navBar" className="justify-content-end">
        <Nav.Item>
          <Nav.Link id={foo === "home" ? "selectedPage" : "nav-link"} href="/">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            id={foo === "friends" ? "selectedPage" : "nav-link"}
            href="/friends"
          >
            Friends
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="/profile"
            id={foo === "profile" ? "selectedPage" : "nav-link"}
          >
            Profile
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {!signedIn && (
            <Nav.Link
              href="/login"
              id={foo === "login" ? "selectedPage" : "nav-link"}
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
