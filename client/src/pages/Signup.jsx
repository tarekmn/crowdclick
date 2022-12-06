import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import LogoSection from "../component/LogoSection";
import Slider from "../component/Slider";

const Signup = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    image: "stock0",
  });

  const createUser = async (req, res) => {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        image: `stock${currentIndex}`,
      }),
    });

    window.location.href = "/";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    createUser();
  };

  return (
    <Container style={{}}>
      <Form onSubmit={handleFormSubmit}>
        <LogoSection />
        <h1>Create account</h1>
        <Form.Group className="mb-3">
          <Form.Label>Profile Picture</Form.Label>
          <Slider
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="jdoe@gmail.com"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Button type="submit" className="postBtn" size="md">
            Submit
          </Button>
          <Button type="submit" className="signupBtn" href="/login" size="md">
            Back
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Signup;
