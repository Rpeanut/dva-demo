import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import menuTree from '../constant/menu';

const defaultOpenKey = '1'
const { SubMenu } = Menu
function Menus({ location }) {
    // 递归生成菜单
  const getMenus = (menuTree) => {
    return menuTree.map((item) => {
      if (item.subs) {
        const title = <span>{item.icon && <Icon type={item.icon} />}{item.name}</span>;
        return (
          <SubMenu
            key={item.id}
            title={title}>
            {getMenus(item.subs)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.route}>
          <Link to={item.route || '/404'}>
            {item.icon && <Icon type={item.icon} />}
            {item.name}
          </Link>
        </Menu.Item>
      )
    })
  };
  const menuItems = getMenus(menuTree)
  const selectedKey = location.pathname.replace(/([a-zA-Z])\/.+/, '$1')
  return (
    <Menu
      defaultOpenKeys={[defaultOpenKey]}
      theme="light"
      mode="inline"
      selectedKeys={[selectedKey]}>
      {menuItems}
    </Menu>
  )
}

export default Menus;
