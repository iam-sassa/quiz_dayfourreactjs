import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Input, Layout, Button, Col, Row, Divider } from "antd";
import "./Pages.css";


const { Search, TextArea } = Input;
const { Content } = Layout;

const PostPage = () => {

const [data, setData] = useState(null);
const [filter, setFilter] = useState('');
const [value, setValue] = useState('');
const [limit, setLimit] = useState(5);
const [offset, setOffset] = useState(1);


const setDisplay = (e) => {
    e.preventDefault();
    setFilter(e.target[0].value);
    setValue(e.target[1].value);
    console.log(value);
    console.log(filter);
}

const resetDisplay = () => {
    setFilter('');
    setValue('');
    console.log(value);
    console.log(filter);
}

const handleLimit = (e) => {
    setLimit(e.target.value);
    console.log(limit);
}

const addOffset = () => {
    setOffset(offset + 1);
    console.log(offset);
}

const minOffset = () => {
    setOffset(offset - 1);
    console.log(offset);
}


  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3004/post?" + filter + "=" + value + "&_limit=" + limit + "&_page=" + offset);

      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [limit, offset, filter, value]);

  const postData = async (e) => {
    e.preventDefault();

    console.log("Post")

    try {
      const res = await axios.post("http://localhost:3004/post", {
        title: e.target[0].value,
        category: e.target[1].value,
        description: e.target[2].value,
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
        "http://localhost:3004/post/" + e.target[0].value,
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
        "http://localhost:3004/post/" + e.target[0].value,
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
        "http://localhost:3004/post/" + e.target[0].value
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
            <Content>

              <Row gutter={8} style={{marginLeft: '25px', overflowY: 'auto', marginRight: '25px'}}>
                  {data?.map((post) => (
                      <Col style={{marginBottom: '10px'}}
                        span={6}
                      >
                        <div className="Data" key={post.id}> 
                        <h3>{post.title}</h3>
                        <br/>
                        <i>{post.category}</i>
                        <br/>
                        {post.description}
                        <br/>
                        </div>
                      </Col>

                  ))}
              </Row>
  
              <Divider/>

              <Row gutter={8} style={{marginLeft: '250px', marginRight: 'auto'}}>
              <Col span={4}>
                <div className="Card">
                <Input type="text" placeholder="limit" onChange={(e) => {handleLimit(e)}} />
                <Button onClick={addOffset} type="text">Next</Button>
                <Button onClick={minOffset} type="text">Prev</Button>


                  </div>
                </Col>
                <Col span={8}>
                <div className="Card">
                <h1>Request data with axios</h1>
                <form onSubmit={ (e) => {setDisplay(e)
                  }}>
                    <Input type="text" placeholder="filter" allowClear />
                    <Input type="text" placeholder="value" allowClear />
  
                    <Button  htmlType="submit" type="dashed">Filter Data</Button>
                  </form>
                    <Button onClick={resetDisplay}  htmlType="submit" type="dashed">Reset Filter</Button>
                  </div>
                </Col>
                <Col span={6}>
                <div className="Card">
                <Search
                    placeholder="input search text"
                    onSearch={addOffset}
                    style={{
                    width: 200,
      }}
    />


                  </div>
                </Col>
              </Row>

              <Divider/>
  
              <Row gutter={8} style={{marginLeft: '40px'}}>
                <Col span={4} style={{margin: '40px'}}>
                <h1>POST Request to JSON Server</h1>
                  <form  
                    onSubmit={(e) => {
                      postData(e);
                    }}
                  >
                    <Input type="text" placeholder="title" allowClear />
                    <Input type="text" placeholder="category" allowClear />
                    <TextArea placeholder="description" autoSize={{ minRows: 3, maxRows: 5, }} />
  
                    <Button htmlType="submit" type="primary" >Post Data</Button>
                  </form>
                </Col>
                <Col span={4} style={{margin: '40px'}}>
                  <h1>PUT Request to JSON Server</h1>
                  <form onSubmit={ (e) => {putData(e)
                  }}>
                    <Input type="text" placeholder="id" allowClear />
                    <Input type="text" placeholder="title" allowClear />
                    <Input type="text" placeholder="category" allowClear />
                    <TextArea placeholder="description" autoSize={{ minRows: 3, maxRows: 5, }} />
  
                    <Button  htmlType="submit" type="primary">Put Data</Button>
                  </form>
                </Col>
                <Col span={4} style={{margin: '40px'}}>
                  <h1>PATCH Request to JSON server</h1>
                  <form onSubmit={ (e) => {patchData(e)
                  }}>
                    <Input type="text" placeholder="id" allowClear />
                    <Input type="text" placeholder="title" allowClear />
                    <Input type="text" placeholder="category" allowClear />
                    <TextArea placeholder="description" autoSize={{ minRows: 3, maxRows: 5, }} />
  
                    <Button htmlType="submit" type="primary">Patch Data</Button>
                  </form>
                </Col>
                <Col span={4} style={{margin: '40px'}}>
                  <h1>Delete REQUEST to JSON Server</h1>
                  <form onSubmit={ (e) => {deleteData(e)}}>
                    <Input type="text" placeholder="id" allowClear />
  
                    <Button htmlType="submit" type="primary" danger>Delete Data</Button>
                  </form>
                </Col>
               
              </Row>
  
            </Content>
          </Layout>
        </div>
      </>
    );
};

export default PostPage;