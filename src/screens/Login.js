import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://food-backend-g0hw.onrender.com/api/loginuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const json = await response.json();
    
      if (!json.success) {
        alert("enter valid credentials");
      }
      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
       // console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (err) {
      console.log(`error durning Login ${err}`);
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/createuser">
          <Button variant="danger" type="submit" className="m-3">
            New User ?
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default Login;
