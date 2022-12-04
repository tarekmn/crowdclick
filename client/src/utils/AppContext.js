/* eslint-disable react-hooks/exhaustive-deps */
import Cookie from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppProvider = (props) => {
  const [appState, setAppState] = useState({ user: null });
  const [appReady, setAppReady] = useState(false);
  const [justFriends, setJustFriends] = useState([]);
  const [notFriends, setNotFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const [userData, setUserData] = useState();

  const getUsers = async () => {
    const query = await fetch("/api/users", {
      method: "GET",
    });
    const response = await query.json();
    setUserData(response);
    console.log("In getUsers: userData is set");
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (appState.user && userData) {
      const currentUserID = appState.user._id;
      const allUsers = userData;
      const friendIds = appState.user.friends;

      const currentUser = allUsers.filter((user) =>
        user.id.includes(currentUserID)
      )[0];

      const justFriendsV = allUsers.filter((user, i) =>
        friendIds.includes(user.id)
      );

      const notFriendsV = allUsers.filter(
        (user, i) => !friendIds.includes(user.id) && user.id !== currentUserID
      );

      setJustFriends(justFriendsV);
      setNotFriends(notFriendsV);
      setCurrentUser(currentUser);
    }
  }, [userData]);

  const lookupUser = async () => {
    const authCheck = await fetch("/api/users/lookup");
    const checkResult = await authCheck.json();
    if (checkResult && checkResult.result === "success") {
      setAppState({ ...appState, user: checkResult.payload });
      setAppReady(true);
    } else {
      setAppReady(true);
    }
  };

  const logout = () => {
    Cookie.remove("auth-token");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (!appState.user) lookupUser();
  }, [appState.user]);

  return (
    <>
      {appReady === true && (
        <AppContext.Provider
          value={{
            appState,
            setAppState,
            lookupUser,
            logout,
            justFriends,
            notFriends,
            currentUser,
          }}
        >
          {props.children}
        </AppContext.Provider>
      )}
    </>
  );
};

const AppConsumer = AppContext.Consumer;
export { AppContext, AppConsumer, AppProvider };
