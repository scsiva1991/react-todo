import React, { Component } from 'react';
import {Button, IconButton} from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

class TodoCard extends Component {
  render() {
    return (
      <Card>
          <CardTitle
           title="Todo List"
           subtitle="Subtitle here"
         />
         <CardText>hoi</CardText>
          <CardActions  >
            <Button label="Action 1" />
            <Button label="Action 2" />
          </CardActions>
      </Card>
    );
  }
}

module.exports = TodoCard;
