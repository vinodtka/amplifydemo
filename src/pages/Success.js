import React from "react";
// import ReactDOM from "react-dom";
import { Layout, Row, Col, Result} from "antd";
import bank from '../assets/bank2.jpg';
import "antd/dist/antd.css";
import "../App.css";

const { Content } = Layout;
// const { Title } = Typography;

class Success extends React.Component {

    render(){
        return (
            <Content style={{ padding: "50px", height: '100vh' }}>      
              <div className="site-layout-content">
                <Row >
                  <Col span={12} style={{ backgroundImage: `url(${bank})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '700px'}}>
                    {/* <img src={bank} alt="Logo" style={{maxWidth: '100%', maxHeight: '100%'}}/> */}
                  </Col>
                  <Col span={12}>
                      <div className="formBox">
                        <Result
                            status="success"
                            title="Thank you for registering!"
                            subTitle="Your account has been created successfully!"                            
                        />
                      </div>            
                  </Col>
                </Row>
              </div>
            </Content>
          );
    }
  
}

export default Success;
