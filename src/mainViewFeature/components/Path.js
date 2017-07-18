import React from 'react';
import PathWord from './PathWord';

class Path extends React.Component {

  constructor(props) {
    super(props);
  }

  getPath(path) {
    const array = path.split(',');
    array.pop();
    array.shift();

    try {
      return array.map((word) => {
        return <PathWord handyEvent={this.props.handyEvent} name={word} />
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const path = this.getPath(this.props.path);

    return(
     <div> { path } </div>
    )
  }

}

export default Path
