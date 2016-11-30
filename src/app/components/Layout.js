import React, { Component } from 'react';
import 'react-toolbox/lib/commons.scss';

class Layout extends Component {
  render() {
    return (

      <div >
         {this.props.children}
     </div>

    );
  }
}

export default Layout;
