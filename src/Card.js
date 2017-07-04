import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handyTrigger = this.handyTrigger.bind(this)
  }

  handyTrigger() {
    console.log(this.props)
    this.props.handyEvent({name: this.props.name})
  }

  render() {
    return (
      <div onClick={this.handyTrigger}>
        {this.props.name}
      </div>
    )
  }
}

export default Card;
