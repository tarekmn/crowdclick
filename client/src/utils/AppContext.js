/* eslint-disable react-hooks/exhaustive-deps */
import Cookie from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"

const AppContext = createContext()
export const useAppContext = () => useContext(AppContext)

const AppProvider = (props) => {
  const [appState, setAppState] = useState({ user: null });
  const [appReady, setAppReady] = useState(false);
  const [justFriends, setJustFriends] = useState([]);
  const [notFriends, setNotFriends] = useState([]);




  useEffect(() => {

    if (appState.user && props.userData) {
      const currentUserID = appState.user._id
      const allUsers = props.userData
      const friendIds = appState.user.friends;
      // console.log(currentUserID)
      // console.log(allUsers)
      // console.log(friendIds)

      const currentUser = allUsers.filter(user => user.id.includes(currentUserID))

      const justFriendsV = allUsers.filter((user, i) =>
        friendIds.includes(user.id)
      );

      const notFriendsV = allUsers.filter((user, i) =>
        !friendIds.includes(user.id)
      );

      setJustFriends(justFriendsV)
      setNotFriends(notFriendsV)

    }

  }, [appState.user]);


  useEffect(() => {
    console.log(justFriends);
  }, [justFriends]);

  useEffect(() => {
    console.log(notFriends);
  }, [notFriends]);




  const lookupUser = async () => {
    const authCheck = await fetch("/api/users/lookup")
    const checkResult = await authCheck.json()
    if (checkResult && checkResult.result === "success") {
      setAppState({ ...appState, user: checkResult.payload })
      setAppReady(true)
    } else {
      setAppReady(true)
    }
  }

  const logout = () => {
    Cookie.remove("auth-token")
    window.location.href = "/login"
  }

  useEffect(() => {
    if (!appState.user) lookupUser()
  }, [appState.user])

  return (
    <>
      {appReady === true && (
        <AppContext.Provider value={{ appState, setAppState, lookupUser, logout, justFriends, notFriends }}>
          {props.children}
        </AppContext.Provider>
      )}
    </>
  )
}

const AppConsumer = AppContext.Consumer
export { AppContext, AppConsumer, AppProvider }