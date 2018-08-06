import React, { Component } from 'react';
import {
    Row,
    Col,
    Panel,
    Table,
    Select,
    Breadcrumb,
    Icon
} from 'tinper-bee';
import { EditableCell, LoadingTable } from '../../components/index';

import './index.css';

const Option = Select.Option;

class GroupManager extends Component{
    constructor(props){
        super(props);
        this.columns1=[];
        this.data1=[];
        this.columns2 = [
            { title: '小组名称', dataIndex: 'name', key: 'name'},
            { title: '口号', dataIndex: 'status', key: 'status'},
            { title: '成绩', dataIndex: 'date', key: 'date' ,width: '30%', render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'name')}
                />
            )},
            {title: '操作', dataIndex: 'price', key: 'price'},
        ];
        this.state = {
            data2 : [
                { name: '双立人', status: '青春不孤单，兄弟姐妹加油干！', date: '300', price: '30555', key: '0' },
                { name: '达人', status: 'hot', date: '300', price: '68888', key: '1' },
                { name: '蓝精灵', status: 'hot', date: '300', price: '28889', key: '2' },
                { name: '球星', status: 'test', date: '300', price: '36666', key: '3' },
                { name: '大V', status: 'new', date: '300', price: '25777', key: '4' }
            ],
            filterKey: null
        }
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

    render () {
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
                    <Panel header="小组列表">
                        <Table
                            columns={ this.columns2 }
                            data={ this.state.data2 }
                        />
                    </Panel>
                </Col>
            </Row>
        )
    }
}

export default GroupManager;