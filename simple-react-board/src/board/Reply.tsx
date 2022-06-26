import React, {Component} from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";

class Reply extends Component<any> {
  constructor(props: any){
    super(props);
    this.state = {
      replyList: this.props.replyList
    }
  }
  render() {
    console.log("댓글 안나오냐?",this.props.replyList)
    return (
      <>
        {this.props.replyList.map((v: any) => {
          <span>{v}</span>
      })}
      </>
    )
  }
}

export default Reply;