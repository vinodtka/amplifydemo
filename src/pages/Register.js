import React from "react";
// import ReactDOM from "react-dom";
import { Button, Layout, Typography, Row, Col, Form, Input, notification } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import {
    Link, withRouter
  } from "react-router-dom";
import axios from "axios";
// import Stats from './Stats';
import bank from '../assets/bank.jpg';
import "antd/dist/antd.css";
import "../App.css";

const { Content } = Layout;
const { Title, Text } = Typography;

class Register extends React.Component {
    state={
        loading: false,
        apiError: false,
        ip: null,
        userAgent: null,
        fdoutcome: null,
        fdscore: null
    }

    componentWillMount(){
        this.getStats();        
    }

    getStats = async() => {
        try{
            let res = await axios.get("https://www.cloudflare.com/cdn-cgi/trace");
            let data = res.data.replace(/[\r\n]+/g, '","').replace(/=+/g, '":"');
                data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
            const jsondata = JSON.parse(data);
            this.setState({ ip: jsondata.ip, userAgent: jsondata.uag });
        }catch(err){
            console.log(err);
        }
    }

    getPrediction = async(values) =>{
        try{
            // {header: {x-api-key:<api_key>}}
            //https://drv4zh6s22.execute-api.us-east-1.amazonaws.com/sample/detect
            // let res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
            let res = await axios.get("https://drv4zh6s22.execute-api.us-east-1.amazonaws.com/sample/detect", {params:{
                email_address: values.email,
                ip_address: this.state.ip
            }});
            this.setState({loading: false, fdoutcome: res.data.body.outcomes[0], fdscore: res.data.body.score }, () => {
                this.openNotificationWithIcon(values);
            });
            
            // this.openNotificationWithIcon(values);
            console.log("Response - ", res.data.body);
            // if(res.data.id === 1){
            //     this.props.history.push("/confirm");
            // }else{
            //     this.props.history.push("/success");
            // }
        }catch(error){
            console.log(error);
        }
    }

    onFinish = values => {
        // console.log('Success:', values);
        this.setState({ loading : true });
        // this.props.history.push("/success");
        // this.props.history.push("/confirm");
        this.getPrediction(values);        
      };
    
      openNotificationWithIcon = data => {
        notification.info({
            message: 'Data Submitted',
            description:
            <>                
                <Text>Email: {data.email}</Text><br/>                
                <Text>IP: <Text code>{this.state.ip}</Text></Text><br/>
                <Text>AFD Score: <Text code>{this.state.fdscore}</Text></Text><br/>
                <Text>AFD Outcome: <Text code>{this.state.fdoutcome}</Text></Text><br/>
            </>,
            placement: 'bottomLeft',
            duration: 0,
            className: 'notifClass'
        });
      };

    render(){
        return (
            <>
            <Content style={{ padding: "50px", height: '100vh' }}>      
              <div className="site-layout-content">
                <Row >
                  <Col span={12} style={{ backgroundImage: `url(${bank})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '700px'}}>
                    {/* <img src={bank} alt="Logo" style={{maxWidth: '100%', maxHeight: '100%'}}/> */}
                  </Col>
                  <Col span={12}>
                      <div className="formBox">
                        <Title level={1} style={{color: '#546E7A'}}>A new way to bank.</Title>
                        <Title level={3} style={{color: '#546E7A'}}>Create an account</Title>
                        <Form
                          // {...layout}
                          hideRequiredMark={true}
                          layout='vertical'
                          name="basic"
                          size="large"                          
                          // initialValues={{ remember: true }}
                          onFinish={this.onFinish}
                          // onFinishFailed={onFinishFailed}
                        >
                          <Form.Item
                            // label="Username"
                            name="username"                    
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            help="Letters, digits, and @,_ only "
                          >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                          </Form.Item>

                          <Form.Item
                            // label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            style={{marginTop: '10px'}}
                          >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                          </Form.Item>
        
                          <Form.Item
                            // label="Email address"
                            name="email"
                            rules={[{ required: true, message: 'Please enter your email!' }, {type: 'email', message: 'Invalid email'}]}
                          >
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email address"/>
                          </Form.Item>

                          <Form.Item
                            // label="SSN"
                            name="ssn"                    
                            rules={[{ required: true, message: 'Please input your SSN!' }]}
                            help="Digits, and - only "
                          >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="SSN" />
                          </Form.Item>

                          <Form.Item >
                            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
                              REGISTER
                            </Button>

                            {/* <Button onClick={this.printName}>Hello</Button> */}
                            <div className="sign-in">
                                Already have an account? <Link to="/signin"> Sign-in </Link>
                            </div>                            
                          </Form.Item>
                        </Form>
                      </div>            
                  </Col>
                </Row>
              </div>
            {/* <Stats/> */}
            </Content>
               
            </>
          );
    }
  
}

export default withRouter(Register) ;
