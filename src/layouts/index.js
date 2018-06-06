import React from "react";
import { connect } from "dva";
import NProgress from 'nprogress'
import { Layout, Icon, Button, BackTop } from "antd";
import { logo } from '../constans';
import Menus from './menus';
import styles from './index.css';

const { Header, Sider, Content, Footer } = Layout;
let lastHref
class App extends React.Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    const { href } = window.location
    const { collapsed } = this.state;
    if (lastHref !== href) {
      NProgress.start()
      if (!this.props.loading.global) {
        NProgress.done()
        lastHref = href
      }
    }
    return (
      <Layout className={styles.app}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            backgroundColor: '#fff'
          }}>
          <div className={styles.logoContainer}>
            <img alt="logo" src={logo} className={styles.logo} />
            {collapsed ? '' : <span>系统管理后台</span>}
          </div>
          <Menus location={this.props.location} collapsed={collapsed} />
        </Sider>
        <Layout className={styles.contentWrap}>
          <Header className={styles.header}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <Button type="dashed">
              <span>您好，xxx</span>
              <Icon type="logout" />
            </Button>
          </Header>
          <Content className={styles.content} id="mainContainer">
            <BackTop target={() => document.getElementById('mainContainer')} />
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default connect(({ app, loading }) => ({ app, loading }))(App)
