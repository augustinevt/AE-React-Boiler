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
      <div className="child-card"> 
        <div className="child-card__name" onClick={this.handyTrigger}>
          {this.props.name}
        </div>
      </div>
    )
  }
}

export default Card;
