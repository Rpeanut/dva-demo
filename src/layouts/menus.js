import { Menu, Icon } from 'antd';
import Link from 'umi/link';

function Menus({ location, collapsed }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      theme="light"
    >
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />Home</Link>
      </Menu.Item>
      <Menu.Item key="/users">
        <Link to="/users"><Icon type="bars" />Users</Link>
      </Menu.Item>
      <Menu.Item key="/post">
        <Link to="/post"><Icon type="file" />Posts</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Menus;
