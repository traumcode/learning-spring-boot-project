import fetch from 'unfetch';
import { Layout, Menu, Breadcrumb, Table } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import classes from './AllStudents.module.css';
import {useState, useEffect} from "react";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
                setUserList(data)
                setIsLoading(false);
            });
    }, []);
    
    const renderUsers = users => {
        if(users.length <= 0) {
            return "No data available"
        } else {
            return <Table dataSource={userList} columns={columns}/>
        }
    }
    
    if (isLoading) {
        return <p>Loading...</p>

    }
    if (userList.length <= 0) {
        return <div>
            <h3>SRY BUT NO USERS IN THE DATABASE</h3>
        </div>
    } else {

        return (

            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed}
                       onCollapse={setCollapsed}>
                    <div className={classes.logo} />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            Home
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            {userList.map((user, index) => {
                                return <Menu.Item onClick={()=>{setCurrentUser(user.name)}} key={index+1}>{user.name}</Menu.Item>
                            })}
                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className={classes.sitelayout}>
                    <Header className={classes.sitelayoutbackground} style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            {currentUser != null ? <Breadcrumb.Item>{currentUser}</Breadcrumb.Item> : <p></p>}

                        </Breadcrumb>
                        <div className={classes.sitelayoutbackground} style={{ padding: 24, minHeight: 360 }}>
                            {userList.length <= 0 ? <h3>NO DATA..</h3> : <h3>Data available</h3>}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default FetchStudents;



