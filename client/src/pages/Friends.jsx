import { useAppContext } from "../utils/AppContext";

const Section = () => {
  const { appState, justFriends, notFriends } = useAppContext();

  console.log(justFriends);
  console.log(notFriends);

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

          <div className="my-3 p-3 bg-body bg-light rounded shadow-sm">
            <h6 className="purple-color border-bottom pb-2 mb-0">
              Current Friends
            </h6>

            {justFriends &&
              justFriends.map((item, i) => (
                <div key={i} className="d-flex text-muted pt-3">
                  <img
                    className="postimg"
                    src={`/stock/${item.image}.png`}
                    width="32"
                    height="32"
                  />

                  <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div className="d-flex justify-content-between">
                      <strong className="text-gray-dark">
                        {item.username}
                      </strong>
                      <a className="purple-color" href="/users/{{friend.id}}">
                        Remove Friend
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="my-3 p-3 bg-body bg-light rounded shadow-sm">
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
                    height="32"
                  />

                  <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div className="d-flex justify-content-between">
                      <strong className="text-gray-dark">
                        {item.username}
                      </strong>
                      <a className="purple-color" href="/users/{{friend.id}}">
                        Add Friend
                      </a>
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
