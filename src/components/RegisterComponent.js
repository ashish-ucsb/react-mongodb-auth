import React, { Component } from "react";
import axios from "axios";

export class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      password: "",
    };
  }

  submitHandler = (e) => {
    axios
      .post("http://localhost:5000/user", this.state)
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/");
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
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={this.changeHandler}
          value={this.state.name}
        ></input>
        <br />
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
        <button type="submit">Register</button>
      </form>
    );
  }
}

export default RegisterComponent;
