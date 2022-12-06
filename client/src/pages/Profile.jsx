import { useAppContext } from "../utils/AppContext";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Thought from "../component/Thought";
import Form from "react-bootstrap/Form";
import Slider from "../component/Slider";

const Profile = (props) => {
  const { currentUser } = useAppContext();
  const [isShown, setIsShown] = useState(false);

  const [currentInfo, setCurrentInfo] = useState();

  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);

  useEffect(() => {
    setCurrentInfo({
      username: currentUser.username,
      email: currentUser.email,
      image: `stock${currentIndex}`,
    });
  }, [currentUser, currentIndex]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(currentInfo);
    const query = await fetch(`/api/users/${currentUser.id}`, {
      method: "PUT",
      body: JSON.stringify(currentInfo),
      headers: {
        "Content-type": "application/json",
      },
    });
    await query.json();
    window.location.reload();
  };

  const handleInputChange = (e) => {
    setCurrentInfo({ ...currentInfo, [e.target.name]: e.target.value });
  };

  const mainStyle = "padding my-3 p-3  bg-light rounded shadow-md";
  const div1Style = "d-flex justify-content-center";
  const h6Style = "border-bottom pb-2 mt-5";

  return currentUser.length <= 0 ? (
    "Loading..."
  ) : (
    <>
      <main className="container">
        <div className={mainStyle}>
          <div className="profile-header">
            <div className={div1Style}>
              <img
                className="mb-4 mt-4 profile-pic"
                src={`/stock/${currentUser.image}.png`}
                alt="user"
                width="20%"
              />
            </div>
            <div className="container">
              <div className={div1Style}>
                <h3 className="m-b-0">{currentUser.username}</h3>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsShown((current) => !current)}
            type="button"
            className="postBtn btn-sm"
          >
            {isShown ? "Cancel" : "Update Info"}
          </button>
        </div>

        {isShown && (
          <div>
            <Form style={{}} onSubmit={handleFormSubmit}>
              <Form.Group style={{ width: "50%", margin: "0 auto" }}>
                <Form.Label>Profile Picture</Form.Label>
                <Slider
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="John"
                  value={currentInfo.username}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group style={{ width: "50%", margin: "0 auto" }}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="jdoe@gmail.com"
                  value={currentInfo.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-6"
                style={{ width: "50%", margin: "0 auto", padding: "5px" }}
              >
                <Button type="submit" className="postBtn" size="sm">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </div>
        )}

        <div className={div1Style}>
          <h6 className={h6Style} id="post-title">
            Posts
          </h6>
        </div>

        <div className="container">
          <div className={mainStyle}>
            {currentUser.thoughts.map((thought, i) => {
              const item = { thought, user: currentUser };
              return <Thought key={i} item={item} i={i} />;
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
