import React, { useContext, useState } from "react";
import useForm from "./useForm";
import { Link } from "react-router-dom";
import {
  Form,
  Grid,
  Header,
  Segment,
  Button,
  Message
} from "semantic-ui-react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { UserContext } from "../context/Context";

const UserLogin = prop => {
  const { values, handleChange, handleSubmit } = useForm(logIn);
  const [userr, setUser] = useContext(UserContext);

  function logIn() {
    console.log(values);

    let user = {
      email: values.email,
      password: values.password
    };

    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user })
    })
      .then(resp => resp.json())
      .then(data => setUser(data));
    prop.history.push("/");
  }

  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "60vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h2" color="black" textAlign="center">
            <HomeOutlinedIcon /> Log-in to your account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="email"
                placeholder="E-mail address"
                value={values.email || ""}
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                value={values.password || ""}
                onChange={handleChange}
                type="password"
              />
              {/* if authenticated send to profile  */}
              <Button color="black" fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/UserSignUp">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};
export default UserLogin;
