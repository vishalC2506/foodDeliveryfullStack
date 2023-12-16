import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log(credentials);
    try {
      const response = await fetch("http://localhost:4000/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          password: credentials.password,
          location: credentials.geolocation,
          email: credentials.email,
        }),
      });
  

      const json = await response.json();

      if (!json.success) {
        alert("enter valid credentials");
      }
    } catch (err) {
      console.log(`error durning signup ${err}`);
    }
  };
  const onFieldChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="w-full flex justify-center items-center min-h-screen ">
      <Form
        className=" w-[clamp(18rem,60%,75%)]  border-2 p-3 bg-gray-400 
    rounded-lg shadow-[4px_2px_10px_2px_rgba(0,0,0,0.5)] "
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="name"
            value={credentials.name}
            onChange={onFieldChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={onFieldChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onFieldChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="address"
            name="geolocation"
            value={credentials.geolocation}
            onChange={onFieldChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/login">
          <Button variant="danger" type="submit" className="m-3">
            Already a User
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default SignUp;
