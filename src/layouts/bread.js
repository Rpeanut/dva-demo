import React from 'react'
import { Breadcrumb } from 'antd'
import Link from 'umi/link';
import breadcrumbNameMap from '../constant/bread';

const Bread = ({ location }) => {
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const linkUrl = url.replace(/\d+/g, '(:id)');
    if (breadcrumbNameMap[linkUrl]) {
      return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[linkUrl]}
        </Link>
      </Breadcrumb.Item>
      )
    }
    return null;
  })
  const breadcrumbItems = [(
    <Breadcrumb.Item key="root">推荐系统管理</Breadcrumb.Item>
  )].concat(extraBreadcrumbItems);
  return (
    <div style={{ marginLeft: 24, marginTop: 16 }}>
      <Breadcrumb>
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  )
}

export default Bread
