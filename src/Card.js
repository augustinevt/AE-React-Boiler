import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handyTrigger = this.handyTrigger.bind(this)
  }

  handyTrigger() {
    console.log(this.props)
    this.props.handyEvent({props: 'data'})
  }

  render() {
    return (
      <div onClick={this.handyTrigger}>
        foo
      </div>
    )
  }
}

export default Card;
