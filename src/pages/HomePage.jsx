import React from "react";
import { Divider, Menu } from "antd";
import { Layout } from "antd";
import {
  UserOutlined,
  EditOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Pages.css";

const { Header, Content } = Layout;

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToPost = () => {
    navigate("/post", { replace: true });
  };

  const navigateToUser = () => {
    navigate("/user", { replace: true });
  };

  return (
    <>
      <Layout>
        <Header>
          <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
            <Menu.SubMenu
              key="SubMenu"
              title="Choose Here"
              icon={<MenuOutlined />}
            >
              <Menu.Item
                onClick={navigateToPost}
                key="two"
                icon={<EditOutlined />}
              >
                Post
              </Menu.Item>
              <Menu.Item
                onClick={navigateToUser}
                key="three"
                icon={<UserOutlined />}
              >
                User
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Header>
        <Layout>
          <Content style={{marginTop: '25px'}}>
            <center>
              <h1>DATA Playing with Axios and JSON Server</h1>
            </center>
            <Divider/>

            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default HomePage;
