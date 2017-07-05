import React from 'react';

class PathWord extends React.Component {
  constructor(props) {
    super(props);

    this.handyTrigger = this.handyTrigger.bind(this);
  }

  handyTrigger() {
    this.props.handyEvent({ name: this.props.name });
  }

  render() {
    return (
      <span className="path__word" onClick={this.handyTrigger}>
        {this.props.name} >
      </span>
    )
  }
}

export default PathWord;
