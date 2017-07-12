import React from 'react';

class NewNodeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Name...',
    };

    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  submit(e) {
    if (e.key == "Enter") {
      this.props.otherHandyEvent({name: this.state.name })
    }
  }

  onChange(e) {
console.log(e)

    this.setState({ name: e.target.value })

  }

  render() {
    return (
      <div className="newNodeForm" >
        <input onChange={this.onChange} type="text" value={this.state.name} onKeyPress={this.submit} />
      </div>
    )
  }
}

export default NewNodeForm;
