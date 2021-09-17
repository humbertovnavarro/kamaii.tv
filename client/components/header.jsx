import React from 'react';
import Avatar from './avatar';
import AppContext from '../app-context';
import UserContextMenu from './usercontext';
class Header extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      contextMenuOpen: this.props.contextMenuOpen
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    if(e.target.id === 'logout') {
      this.context.logout();
    }
    if(!this.context.user.token) {
      this.props.toggleModal('sign-in');
    }
  }
  render() {
    const contextMenu = this.props.contextMenuOpen ?
    <div className="user-context-menu">
      <a href="#dashboard">User Dashboard</a>
      <a href={`#channel?channelId=${this.context.user.userId}`}>My Channel</a>
      <a id="logout" onClick={this.handleClick}>Logout</a>
    </div>
    :
    null;
    const button = (
      <>
      <label htmlFor="login">Login</label>
      <button onClick={this.handleClick} id="login" className="material-icons">person_outline</button>
      </>
    );
    const user = (
      <>
      <label htmlFor="user">{this.context.user.userName}</label>
      <button id="user" onClick={this.handleClick}>
        <Avatar channelId={this.context.user.userId}></Avatar>
      </button>
      {contextMenu}
      </>
    );
    return (
      <div className="header">
        <div className="container">
          <div className="row item-center">
            <div className="column-half">
              <div className="row item-center">
                <h1><a href="#home">{'kamaii.tv'}</a></h1>
                <h2><a href="#browse">{'Browse'}</a></h2>
              </div>
            </div>
            <div className="column-half">
              <div className="row reverse item-center">
                {this.context.user.userName ? user : button}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
