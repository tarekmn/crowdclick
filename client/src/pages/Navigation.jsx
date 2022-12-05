import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";

const Navigation = (props) => {
  const [signedIn, setsignedIn] = useState(true);

  const { appState, logout, notFriends } = useAppContext();

  const logOutFunction = () => {
    logout();
  };

  useEffect(() => {
    if (!appState || !appState.user) {
      setsignedIn(false);
    }
  }, [appState]);

  let loc = window.location.href.split("/").pop();

  const getId = (page) => {
    loc = loc === "" ? "home" : loc;
    return loc === page ? "selectedPage" : "nav-link";
  };

  return (
    <>
      {loc !== "login" ? (
        <Nav id="navBar" className="justify-content-end">
          <Nav.Item>
            <Nav.Link id={getId("home")} href="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link id={getId("friends")} href="/friends">
              Friends{" "}
              <span className="badge text-bg-light rounded-pill align-text-bottom">
                {notFriends.length}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/profile" id={getId("profile")}>
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {!signedIn && (
              <Nav.Link href="/login" id={getId("login")}>
                Login
              </Nav.Link>
            )}

            {signedIn && <Nav.Link onClick={logOutFunction}>Logout</Nav.Link>}
          </Nav.Item>
        </Nav>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navigation;
