import React, { Component } from "react";
import { withSignIn } from "react-auth-kit";
import axios from "axios";

export class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  submitHandler = (e) => {
    axios
      .get(`http://localhost:5000/user/${this.state.username}`)
      .then((res) => {
        if (res.status === 200 && res.data.password === this.state.password) {
          if (
            this.props.signIn({
              token: "dummyToken",
              expiresIn: 10,
              tokenType: "Bearer",
              authState: res.data,
            })
          ) {
            this.props.history.push("/");
          }
        } else {
          this.setState({ username: "", password: "" });
        }
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={this.changeHandler}
          value={this.state.username}
        ></input>
        <br />
        <label>password</label>
        <input
          type="text"
          name="password"
          onChange={this.changeHandler}
          value={this.state.password}
        ></input>
        <br />
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default withSignIn(LoginComponent);
