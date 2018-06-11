import React from "react";
import { connect } from "dva";
import NProgress from 'nprogress'
import { Layout, Icon, Button, BackTop } from "antd";
import { logo } from '../constant';
import Menus from './menus';
import Bread from './bread';
import styles from './index.css';

const { Header, Sider, Content, Footer } = Layout;
let lastHref
class App extends React.Component {
  render() {
    const { href } = window.location
    if (lastHref !== href) {
      NProgress.start()
      if (!this.props.loading.global) {
        NProgress.done()
        lastHref = href
      }
    }
    return (
      <Layout className={styles.app}>
        <Sider style={{ backgroundColor: '#fff' }}>
          <div className={styles.logoContainer}>
            <img alt="logo" src={logo} className={styles.logo} />
            <span>系统管理后台</span>
          </div>
          <Menus location={this.props.location} />
        </Sider>
        <Layout className={styles.contentWrap}>
          <Header className={styles.header}>
            <Button type="dashed">
              <span>您好，xxx</span>
              <Icon type="logout" />
            </Button>
          </Header>
          <Bread location={this.props.location} />
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
