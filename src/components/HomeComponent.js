import React, { Component } from "react";
import { withSignOut, withAuthUser } from "react-auth-kit";
import axios from "axios";
import { compose } from "recompose";

export class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  updateHandler = (e) => {
    axios
      .put(
        `http://localhost:5000/user/${this.props.authState.username}`,
        this.state
      )
      .then((res) => {
        if (res.status === 200) {
          alert("User data successfully modified");
        }
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  deleteHandler = (e) => {
    axios
      .delete(`http://localhost:5000/user/${this.props.authState.username}`)
      .then((res) => {
        if (res.status === 200) {
          alert("User successfully deleted");
          this.props.signOut();
        }
      });
  };

  render() {
    return (
      <div>
        <h1>Hello {this.props.authState.name}</h1>
        <button onClick={() => this.props.signOut()}>Sign Out</button>
        <h5>Update User</h5>
        <form onSubmit={this.updateHandler}>
          <label>New Name: </label>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
            name="name"
            value={this.state.value}
          ></input>
          <button type="submit">Update</button>
        </form>
        <br />
        <button onClick={this.deleteHandler}>Delete User</button>
      </div>
    );
  }
}

export default compose(withSignOut, withAuthUser)(HomeComponent);
