import React from 'react';
import clone from 'clone';

class NodeName extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newName: this.props.name,
      isEditing: false,
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onChange(e) {
    const newValue = e.target.value;
    const newState = clone(this.state);
    newState.newName = newValue
    this.setState(newState);
  }

  onSubmit(e) {
    if (e.key === 'Enter') {

      console.log("shipping to the mainview and then to saga", this.state.newName)
      this.props.updateNode({name: this.state.newName});

      const newState = clone(this.state);
      newState.isEditing = false
      this.setState(newState)

    }

  }

  onClick() {
    const newState = clone(this.state);
    newState.isEditing = true;
    this.setState(newState);
  }


  getJSX(isEditing) {
    let jsx = <h1 onClick={this.onClick}> {this.props.name} </h1>
    if (isEditing) {
      jsx = <input value={this.state.newName} onChange={this.onChange} onKeyPress={this.onSubmit}/>
    }
    return jsx;
  }


  render() {

    const isEditing = this.state.isEditing;
    const jsx = this.getJSX(isEditing);


    return jsx
  }
}

export default NodeName;
