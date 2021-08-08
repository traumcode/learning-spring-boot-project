import fetch from 'unfetch';
import React, {useState, useEffect} from "react";
import {Layout, Menu, Breadcrumb, Table} from 'antd';
import {PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import classes from './AllStudents.module.css';
import * as ReactDOM from "react-dom";
import {Complete} from "./SearchBar";
import {Empty} from "antd";


const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];


const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

function FetchStudents() {
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const [currentUser, setCurrentUser] = useState("-");

    useEffect(() => {
        fetch("api/v2/users")
            .then(checkStatus)
            .then(response => response.json())
            .then(data => {
                setTimeout(function () {
                    setUserList(data)
                    setIsLoading(false);
                }, 1000);
            });
    }, []);

    if (isLoading) {
        ReactDOM.render(<div className={classes.ldsroller}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>, document.getElementById('dog'))

    } else {
        ReactDOM.render(<div></div>, document.getElementById('dog'))
    }

    const renderUsers = () => {

        return <Table dataSource={userList}
                      columns={columns}
                      bordered
                      title={() =>
                          <div className={classes.container}>
                              <Button type="primary" danger>Add new user</Button>
                              <Complete></Complete>
                          </div>}
                      pagination={{pageSize: 50}} scroll={{y: 240}}
                      rowKey={(user) => user.id}

        />
    }

    return (

        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed}
                   onCollapse={setCollapsed}>
                <div className={classes.logo}/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item onClick={() => {
                        setCurrentUser("-")
                    }} key="1" icon={<PieChartOutlined/>}>
                        Home
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                        {userList.map((user, index) => {
                            return <Menu.Item onClick={() => {
                                setCurrentUser(user.name)
                            }} key={user.id}>{index + 1}. {user.name}</Menu.Item>
                        })}
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined/>}>
                        Files
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className={classes.sitelayout}>
                <Header className={classes.sitelayoutbackground} style={{padding: 0}}/>
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        {currentUser != null ? <Breadcrumb.Item>{currentUser}</Breadcrumb.Item> : <p></p>}

                    </Breadcrumb>
                    {currentUser === "-" ?
                        <div className={classes.sitelayoutbackground} style={{padding: 24, minHeight: 360}}>
                            {userList.length <= 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/> : renderUsers()}
                        </div> : userList.map((user) => {
                            if (currentUser === user.name) {
                                return <div key={user.id}>
                                    <h2>{user.name}</h2>
                                    <h4>{user.description}</h4>
                                </div>
                            }
                        })
                    }

                </Content>
                <Footer style={{textAlign: 'center'}}>Traumcode [112358] design ©2021 Created by Silviu Bocsa</Footer>
            </Layout>
        </Layout>
    )
}

export default FetchStudents;



