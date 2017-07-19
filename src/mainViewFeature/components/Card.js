import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handyTrigger = this.handyTrigger.bind(this)
    this.deleteNode = this.deleteNode.bind(this)
  }

  handyTrigger() {
    console.log("Good", this.props.node._id)
    this.props.handyEvent({id: this.props.node._id})
  }

  deleteNode() {
console.log('deleteNode')
    this.props.deleteEvent({id: this.props.node._id})
  }

  render() {
console.log(this)
    return (
      <div className="child-card">
        <div className="child-card__delete-button" onClick={this.deleteNode}> x </div>
        <div className="child-card__name" onClick={this.handyTrigger}>
          {this.props.node.name}
        </div>
      </div>
    )
  }
}

export default Card;
