import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";
import { Input, Layout, Button, Col, Row, Divider } from "antd";

const { Header, Content } = Layout;

function App() {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3004/user");

      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const postData = async (e) => {
    e.preventDefault();

    console.log("Post")

    try {
      const res = await axios.post("http://localhost:3004/user", {
        name: e.target[0].value,
        age: e.target[1].value,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const putData = async (e) => {
    e.preventDefault();
    const body = {};

    for (let i = 0; i < e.target.length - 1; i++) {
      if (e.target[1].value) {
        body[e.target[i].placeholder] = e.target[i].value;
      }
    }

    try {
      const res = await axios.put(
        "http://localhost:3004/user/" + e.target[0].value,
        {
          ...body,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const patchData = async (e) => {
    e.preventDefault();
    const body = {};

    for (let i = 0; i < e.target.length - 1; i++) {
      if (e.target[i].value) {
        body[e.target[i].placeholder] = e.target[i].value;
      }
    }

    try {
      const res = await axios.patch(
        "http://localhost:3004/user/" + e.target[0].value,
        {
          ...body,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async (e) => {
    try {
      const res = await axios.delete(
        "http://localhost:3004/user/" + e.target[0].value
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="App">
        <Layout>
          <Header> React day four</Header>
          <Content>
            <Row gutter={8}>
                <h1>Request data with axios</h1>
                {data?.map((user) => (
                    <Col
                      span={4}
                    >
                      <div key={user.id}> {user.name}</div>
                    </Col>
                ))}
            </Row>

            <Divider/>

            <Row gutter={8}>
              <Col span={4} style={{margin: '40px'}}>
              <h1>PUT Request to JSON Server</h1>
                <form  
                  onSubmit={(e) => {
                    postData(e);
                  }}
                >
                  <Input type="text" placeholder="name" allowClear />
                  <Input type="number" placeholder="age" allowClear />

                  <Button htmlType="submit" type="dashed" >Post Data</Button>
                </form>
              </Col>
              <Col span={4} style={{margin: '40px'}}>
                <h1>PUT Request to JSON Server</h1>
                <form onSubmit={ (e) => {putData(e)
                }}>
                  <Input type="number" placeholder="id" allowClear />
                  <Input type="text" placeholder="name" allowClear />
                  <Input type="number" placeholder="age" allowClear />

                  <Button  htmlType="submit" type="dashed">Put Data</Button>
                </form>
              </Col>
              <Col span={4} style={{margin: '40px'}}>
                <h1>PATCH Request to JSON server</h1>
                <form onSubmit={ (e) => {patchData(e)
                }}>
                  <Input type="number" placeholder="id" allowClear />
                  <Input type="text" placeholder="name" allowClear />
                  <Input type="number" placeholder="age" allowClear />

                  <Button htmlType="submit" type="dashed">Patch Data</Button>
                </form>
              </Col>
              <Col span={4} style={{margin: '40px'}}>
                <h1>Delete REQUEST to JSON Server</h1>
                <form onSubmit={ (e) => {deleteData(e)}}>
                  <Input type="number" placeholder="id" allowClear />

                  <Button htmlType="submit" type="dashed">Delete Data</Button>
                </form>
              </Col>
             
            </Row>

          </Content>
        </Layout>
      </div>
    </>
  );
}

export default App;
