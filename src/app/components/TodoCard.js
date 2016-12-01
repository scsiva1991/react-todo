import React, { Component } from 'react';
import {Button, IconButton} from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

class TodoCard extends Component {
  render() {
    return (
      <Card>
          <CardTitle
           title={this.props.dueDate}
         />
         <CardText>
           Pending Items - {this.props.completedItems} / {this.props.totalItems}
         </CardText>
          <CardActions  >
            <Button label="VIEW" /> 
          </CardActions>
      </Card>
    );
  }
}

module.exports = TodoCard;
