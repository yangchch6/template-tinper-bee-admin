import React, { Component } from 'react';
import {
    Row,
    Col,
    Panel,
    Table,
    Select,
    Breadcrumb,
    Icon,
    Modal,
    FormControl,
    FormGroup,
    Form,
    Label,
    Button
} from 'tinper-bee';
import { EditableCell, LoadingTable } from '../../components/index';

import './index.css';

const Option = Select.Option;

class GroupManager extends Component{
    constructor(props){
        super(props);
        this.state = {
            data2 : [
                { id: 0, name: '双立人', slogan: '青春不孤单，兄弟姐妹加油干！', score: '510', key: '0' },
                { id: 1, name: '达人', slogan: '小组口号', score: '500', key: '1' },
                { id: 2, name: '蓝精灵', slogan: '小组口号', score: '280', key: '2' },
                { id: 3, name: '球星', slogan: '小组口号', score: '450',  key: '3' },
                { id: 4, name: '大V', slogan: '小组口号', score: '300', key: '4' }
            ],
            filterKey: null,
            sortOrder : "" ,
            oldData : "" ,
            showModal: false,
            edit : false ,
            name: '',
            slogan: '',
            score : '',
            checkedAry: []
        }
        this.editId = 0;
        this.columns1=[];
        this.data1=[];
        this.columns2 = [
            { title: '小组名称', dataIndex: 'name', key: 'name'},
            { title: '口号', dataIndex: 'slogan', key: 'slogan'},
            {   title: '成绩', 
                dataIndex: 'score', 
                key: 'score' ,
                width: '20%', 
                render: (text, record, index) => (
                    <EditableCell
                        value={text}
                        onChange={this.onCellChange(record)}
                    />
                ) ,
                sorter: (a, b) => a.score - b.score 
            },
            {title: '操作', dataIndex: 'operation', key: 'price',render: (text, record, index) => (
                <Icon
                    type="uf-pencil-s"
                    onClick={ this.handleEdit(record) }
                />)
            },
        ];
    }

    /**
     * 行操作编辑按钮
     * @param obj
     * @returns {function()}
     */
    handleEdit = (obj) => {
        return () => {
            this.editId = obj.id;
            this.setState({
                showModal: true,
                edit: true,
                name: obj.name,
                slogan: obj.slogan,
                score : obj.score
            });
        }
    }
    /**
     * 添加分组按钮点击事件
     */
    addGroup = () => {
        this.setState({
            showModal: true
        })
    }
    
    /**
     * 输入框事件
     * @param state
     * @returns {function(*)}
     */
    handleInputChange = (state) => {
        return (e) => {
            this.setState({
                [state]: e.target.value
            })
        }
    }
    /**
     * 关闭弹出框
     */
    modalClose = () => {
        this.setState({
            showModal: false,
            name: '',
            slogan: '',
            score : '',
            edit: false
        })
    }
    /**
     * 添加小组/修改信息-弹出框确认事件
     */
    modalEnsure = () => {
        let {data2, edit, name, slogan ,score} = this.state;
        let len = data2.length;
        if (edit) {
            data2.forEach((item) => {
                if (item.id === this.editId) {
                    item.name = name;
                    item.slogan = slogan;
                    item.score = score;
                }
            })
        } else {
            let groupObj = {
                id: len + 1,
                name: name,
                slogan: slogan,
                score: score,
                key: len + 1
            };

            data2.push(groupObj);
        }


        this.setState({
            data2: data2,
            showModal: false,
            name: '',
            slogan: '',
            score : '',
            edit: false
        });
    }

    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.data2];
            dataSource[index][key] = value;
            this.setState({
                data2
            });
        };
    }

    handleChange = (value) => {
        let { data2 } = this.state;
        let data3 = data2.filter( (item) => {
            return item.status === value;
        })

        this.setState({
            filterKey: value,
            data3
        })
    }
    /**
     * 成绩排序算法
     */
    toggleSortOrder=(order, column)=> {
        let { sortOrder, data2, oldData } = this.state;
        let ascend_sort = function(key) {
          return function(a, b) {
            return a.key - b.key;
          };
        };
        let descend_sort = function(key) {
          return function(a, b) {
            return b.key - a.key;
          };
        };
        if (sortOrder === order) {
          // 切换为未排序状态
          order = "";
        }
        if (!oldData) {
          oldData = data2.concat();
        }
        if (order === "ascend") {
            data2 = data2.sort(function(a, b) {
            return column.sorter(a, b);
          });
        } else if (order === "descend") {
            data2 = data2.sort(function(a, b) {
            return column.sorter(b, a);
          });
        } else {
            data2 = oldData.concat();
        }
        this.setState({
          sortOrder: order,
          data2: data2,
          oldData: oldData
        });
    }

    renderColumnsDropdown(columns) {
        const { sortOrder } = this.state;
        const { prefixCls } = this.props;
        return columns.map(originColumn => {
          let column = Object.assign({}, originColumn);
          let sortButton;
          if (column.sorter) {
            const isAscend = sortOrder === "ascend";
            const isDescend = sortOrder === "descend";
            sortButton = (
              <div className={`${prefixCls}-column-sorter`}>
                <span
                  className={`${prefixCls}-column-sorter-up ${isAscend
                    ? "on"
                    : "off"}`}
                  title="↑"
                  onClick={() => this.toggleSortOrder("ascend", column)}
                >
                  <Icon type="uf-triangle-up" />
                </span>
                <span
                  className={`${prefixCls}-column-sorter-down ${isDescend
                    ? "on"
                    : "off"}`}
                  title="↓"
                  onClick={() => this.toggleSortOrder("descend", column)}
                >
                  <Icon type="uf-triangle-down" />
                </span>
              </div>
            );
          }
          column.title = (
            <span>
              {column.title}
              {sortButton}
            </span>
          );
          return column;
        });
    }

    render () {
        let columns = this.renderColumnsDropdown(this.columns2);
        return (
            <Row className="groupmanager">
                <Col md={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">
                            <Icon type="uf-home"/>主页
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Icon type="uf-users"/>小组管理
                        </Breadcrumb.Item>
                    </Breadcrumb> 
                </Col>
                <Col md={12}>
                    <div className="group-board">
                        <Button colors="primary" className="add-user" onClick={ this.addGroup }>添加分组</Button>
                        <Table
                            className="group-table bordered"
                            columns={ columns }
                            data={ this.state.data2 }
                        />
                    </div>
                </Col>
                <Modal
                    show={ this.state.showModal }
                    onHide={ this.modalClose }
                    style={{width: 450}}
                >
                    <Modal.Header className="text-center">
                        <Modal.Title>{ this.state.edit ? '修改信息' : '添加分组' }</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form horizontal>
                            <Row>
                                <FormGroup controlId="formInlineName">
                                    <Col sm={3} className="text-right">
                                        <Label>小组名称:</Label>
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={ this.state.name }
                                            onChange={ this.handleInputChange('name') }
                                            placeholder="请输入小组名称"
                                        />
                                    </Col>
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup controlId="formInlineName">
                                    <Col sm={3} className="text-right">
                                        <Label>口号:</Label>
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={ this.state.slogan }
                                            onChange={ this.handleInputChange('slogan') }
                                            placeholder="请输入小组口号"
                                        />
                                    </Col>
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup controlId="formInlineName">
                                    <Col sm={3} className="text-right">
                                        <Label>成绩:</Label>
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={ this.state.score }
                                            onChange={ this.handleInputChange('score') }
                                            placeholder="请输入小组成绩"
                                        />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </Form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Row>
                            <Col md={2} mdOffset={3}>
                                <Button onClick={ this.modalClose } bordered>关闭</Button>
                            </Col>
                            <Col md={2} mdOffset={1}>
                                <Button onClick={ this.modalEnsure } colors="primary">确认</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </Row>
        )
    }
}

export default GroupManager;