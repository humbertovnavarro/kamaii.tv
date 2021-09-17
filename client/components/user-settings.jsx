import Avatar from "./avatar";
import React from "react";
import AppContext from "../app-context";
class UserSettings extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userName: "",
      password: "",
      passwordConfirm: "",
      email: "",
      streamKey: "",
      streamKeyHidden: true
    }
  }
  componentDidMount() {
    const req = {
      method: "GET",
      headers: {
        "X-Access-Token": this.context.user.token
      }
    }
    fetch("/api/user", req)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState(data);
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {

  }
  render() {
    return (
      <div className="user-settings">
        <h1>User Settings</h1>
        <div className="row">
          <Avatar />
          <button>Upload Profile Picture</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="userName">Username</label>
          <div className="row">
            <input name="userName" onChange={this.handleChange} value={this.state.userName} />
            <input type="submit" value="Update" />
          </div>
        </form>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <div className="row">
            <input name="email" onChange={this.handleChange} value={this.state.email}/>
            <input type="submit" value="Update" />
          </div>
        </form>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="password">Password</label>
          <div className="row">
            <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
            <input type="submit" value="Update" />
          </div>
        </form>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="password">Confirm Password</label>
          <div className="row">
            <input type="password" name="passwordConfirm" onChange={this.handleChange} value={this.state.passwordConfirm}/>
            <input type="submit" value="Update" />
          </div>
        </form>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="password">Stream Key</label>
          <div className="row">
            <input type="password" name="streamKey" onChange={this.handleChange} value={this.state.streamKey} />
            <input type="submit" value="Update" />
          </div>
        </form>
      </div>
    )
  }
}
export default UserSettings;
