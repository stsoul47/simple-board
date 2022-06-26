import { Component, ReactNode } from "react";

/* import bootstrap : S */
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";
/* import bootstrap : E */

import config from '../config/config';

const Board = ({
  id,
  title,
  content,
  //pwd,
  registerId,
  registerDate,
  props,

}: {
  id: number;
  title: string;
  content: string;
  //pwd: string;
  registerId: string;
  registerDate: string;
  props: any;
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={id}
          onChange={(e) => {
            props.onCheckboxChange(e.currentTarget.checked, e.currentTarget.value);
          }}
        ></input>
      </td>
      <td>{id}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td>{registerId}</td>
      <td>{registerDate}</td>
    </tr>
  );
};

interface IProps {
  isComplete: boolean;
  handleModify: any;
  renderComplete: any;
}

class BoardList extends Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      boardList: [],
      checkList: [],
      detailVisible: false,
    };
  }

  state = {
    boardList: [],
    checkList: [],
    detailVisible: false,
  };

  /**
   * 데이터를 받아오는 부분
   * 
   * @author yjj
   * @since 2022-06-23
   */
  getList = () => {
    axios.get(config.BaseUrl)
      .then((res) => {
        const { data } = res;
        this.setState({
          boardList: data,
        });
        this.props.renderComplete();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  onCheckboxChange = (checked: boolean, id: any) => {
    const list: Array<string> = this.state.checkList.filter((v) => {
      return v != id;
    });

    if (checked) {
      list.push(id);
    }

    this.setState({
      checkList: list,
    });
  };

  componentDidMount() {
    this.getList();
  }

  componentDidUpdate() {
    if(!this.props.isComplete) {
      this.getList();
    }
  }

  render(): ReactNode {
    const { boardList }: { boardList: any } = this.state;

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>선택</th>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              {/*<th>비밀번호</th>*/}
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {
              // eslint-disable-next-line
              boardList.map((v: any) => {
                return (
                  <Board
                    id={v.BOARD_ID}
                    title={v.BOARD_TITLE}
                    content={v.BOARD_CONTENT}
                    //pwd={v.BOARD_PWD}
                    registerId={v.REGISTER_ID}
                    registerDate={v.REGISTER_TIME}
                    key={v.BOARD_ID}
                    props={this}
                  />
                );
              })}
          </tbody>
        </Table>
        <Button variant="info">글쓰기</Button>
        <Button 
          variant="secondary"
          onClick={()=>{
            this.props.handleModify(this.state.checkList);
          }}
        >수정하기</Button>
        {/* <Button variant="danger">삭제하기</Button> */}
      </div>
    );
  }
}

export default BoardList;