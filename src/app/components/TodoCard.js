import React, { Component } from 'react';
import {Button, IconButton} from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {browserHistory} from 'react-router';

class TodoCard extends Component {

  handleClick(event) {

  	browserHistory.push('/tasks/'+event.target.id);
  }

  render() {
    console.log(this.props.id);
    return (
      <div className="col-md-3 col-sm-4 col-xs-12 custom-card">
        <Card style={{marginBottom: '10px'}}>
            <CardTitle
             title={this.props.dueDate}
           />
           <CardText>
             Pending Items - {this.props.completedItems} / {this.props.totalItems}
           </CardText>
            <CardActions  >
              <Button label="VIEW" id={this.props.id} onClick={ this.handleClick } />
            </CardActions>
        </Card>
      </div>
    );
  }
}

module.exports = TodoCard;
