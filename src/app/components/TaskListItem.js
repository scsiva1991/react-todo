import React, { Component } from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';

class TaskListItem extends Component {
  render() {
    return(
      <List selectable ripple>
        <ListItem legend={this.props.task}>
           <Avatar title="T" />
         </ListItem>
      </List>
    )
  }
}

module.exports = TaskListItem;
