import { useAppContext } from "../utils/AppContext";

const Section = () => {
  const { appState, justFriends, notFriends } = useAppContext();

  const removeFriend = async (e) => {
    const removeid = e.target.dataset.id;

    await fetch(`/api/users/removefriend/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        removeid,
        currentid: appState.user._id,
      }),
    });
    window.location.reload();
  };

  const addFriend = async (e) => {
    const addid = e.target.dataset.id;

    await fetch(`/api/users/addfriend/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        addid,
        currentid: appState.user._id,
      }),
    });

    window.location.reload();
  };

  return (
    <>
      <main className="container">
        <div>
          <div className="d-flex justify-content-center">
            <img
              className="m-3"
              src="logo-no-background.png"
              alt=""
              width="210"
              height="140"
            />
          </div>

          <div className="my-3 p-3  bg-light rounded shadow-sm">
            <h6 className=" border-bottom pb-2 mb-0">Current Friends</h6>

            {justFriends &&
              justFriends.map((item, i) => (
                <div key={i} className="d-flex text-muted pt-3">
                  <img
                    className="postimg"
                    src={`/stock/${item.image}.png`}
                    alt="similing person"
                    width="32"
                    height="32"
                  />

                  <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div className="d-flex justify-content-between">
                      <strong className="text-gray-dark">
                        {item.username}
                      </strong>
                      <button
                        className="postBtn"
                        data-id={item.id}
                        onClick={removeFriend}
                      >
                        Remove Friend
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="my-3 p-3  bg-light rounded shadow-sm">
            <h6 className="purple-color border-bottom pb-2 mb-0">
              Suggested Friends
            </h6>

            {notFriends &&
              notFriends.map((item, i) => (
                <div key={i} className="d-flex text-muted pt-3">
                  <img
                    className="postimg"
                    src={`/stock/${item.image}.png`}
                    width="32"
                    alt="similingperson"
                    height="32"
                  />

                  <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div className="d-flex justify-content-between">
                      <strong className="text-gray-dark">
                        {item.username}
                      </strong>
                      <button
                        className="postBtn"
                        data-id={item.id}
                        onClick={addFriend}
                      >
                        Add Friend
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Section;
