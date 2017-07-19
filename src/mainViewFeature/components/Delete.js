import React from 'react';

class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.handyTrigger = this.handyTrigger.bind(this)
  }

  handyTrigger() {
    console.log("Good", this.props.node._id)
    this.props.handyEvent({id: this.props.node._id})
  }

  render() {
    return (
        <div className="deletion__button" onClick={this.handyTrigger}>
          x
        </div>
    )
  }
}

export default Delete;
