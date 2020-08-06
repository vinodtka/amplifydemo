import React from "react";
// import ReactDOM from "react-dom";
import { Layout, Menu, Typography } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Success from './pages/Success';
import Error from './pages/Failure';
import Confirm from './pages/Confirmation';
import "antd/dist/antd.css";
import "./App.css";

const { Header, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Layout className="layout">    
        <Header>
          <div className="logo">
            <Title level={3} style={{color: '#fff' , paddingTop: '5%'}}>Anazon Financial Services</Title>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{float: 'right'}}>
            {/* <Menu.Item key="1">Admin</Menu.Item> */}
            <Menu.Item key="1">
              <Link to="/">Register</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/signin">Sign In</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Switch>
          <Route exact path="/">
              <Register/>
          </Route>
          <Route exact path="/signin">
            <Login/>
          </Route>
          <Route exact path="/success">
            <Success/>
          </Route>
          <Route exact path="/error">
            <Error/>
          </Route>
          <Route exact path="/confirm">
            <Confirm/>
          </Route>
        </Switch>
        <Footer style={{ textAlign: "center" }}>
          Anazon Financial Services ©2020
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
