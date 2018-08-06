import React, { Component } from 'react';
import { Navbar, Icon,Menu } from 'tinper-bee';
import { Link } from 'mirrorx';

import './index.css';

const SubMenu = Menu.SubMenu;

class Menus extends Component {
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	current : 1
	    }
	}
	handleClick(e) {
	    this.setState({
	      current: e.key,
	    });
	  }
	render(){
		const { toggle } = this.props;
		return(
			<Menu onClick={this.handleClick.bind(this)}
		        defaultOpenKeys={['demo3sub1']}
		        selectedKeys={[this.state.current]}
		        mode={toggle ? "vertical" : "inline"}
		      >
				<Menu.Item key="1">
					<Link to="/">
						<Icon type="uf uf-users" />
                        {toggle ? "" : <span>小组管理</span>}
					</Link>
				</Menu.Item>
				<Menu.Item key="2">
					<Link to="/usermanager">
						<Icon type="uf-userset" />
                        {toggle ? "" : <span>人员管理</span>}
					</Link>
				</Menu.Item>
				{/* <SubMenu key="sub2" title={<span><Icon type="uf-puzzle-o" />{toggle ? "" : <span>UI Element</span>}</span>}>
					<Menu.Item key="7">
						<Link to="/datatable">
							DataTable 数据表格
						</Link>
					</Menu.Item>
					<Menu.Item key="8">
						<Link to="/reference">
							Reference 参照示例
						</Link>
					</Menu.Item>
				</SubMenu> */}
		      </Menu>
		)
	}
}


export default Menus;
