import React, { PureComponent } from "react";
import { Table, Steps, Popover, Icon } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "id",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "treePath",
    dataIndex: "treePath",
    key: "treePath"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: "12%"
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "30%",
    key: "address"
  }
];
const data = [
  {
    key: 1,
    treePath: '1',
    name: "John Brown sr.",
    age: 60,
    address: "New York No. 1 Lake Park",
    children: [
      {
        key: 11,
        treePath: '1/11',
        name: "John Brown",
        age: 42,
        address: "New York No. 2 Lake Park"
      },
      {
        key: 12,
        treePath: '1/12',
        name: "John Brown jr.",
        age: 30,
        address: "New York No. 3 Lake Park",
        children: [
          {
            key: 121,
            treePath: '1/12/121',
            name: "Jimmy Brown",
            age: 16,
            address: "New York No. 3 Lake Park"
          }
        ]
      },
      {
        key: 13,
        treePath: '1/13',
        name: "Jim Green sr.",
        age: 72,
        address: "London No. 1 Lake Park",
        children: [
          {
            key: 131,
            treePath: '1/13/131',
            name: "Jim Green",
            age: 42,
            address: "London No. 2 Lake Park",
            children: [
              {
                key: 1311,
                treePath: '1/13/131/1311',
                name: "Jim Green jr.",
                age: 25,
                address: "London No. 3 Lake Park"
              },
              {
                key: 1312,
                treePath: '1/13/131/1312',
                name: "Jimmy Green sr.",
                age: 18,
                address: "London No. 4 Lake Park"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 2,
    treePath: '2',
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  }
];
const Step = Steps.Step;

export default class Test extends PureComponent {
  state = {
    selectedRowKeys: []
  };
  keysQueue = [];
  traverse = (node) => {
    if (!node) return;
    this.keysQueue.push(node.key);
    node.children && node.children.forEach(item => this.traverse(item));
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onSelect: (record, selected, selectedRows) => {
        if (selected) {
          // 选中时，只影响子节点
          this.traverse(record);
          this.setState({
            selectedRowKeys: [...new Set(selectedRowKeys.concat(this.keysQueue))]
          }, () => this.keysQueue = [])
        } else {
          // 取消选中时，先取消子节点的,然后处理父节点
          const targetKeys = [...selectedRowKeys];
          this.traverse(record)
          const parents = record.treePath.split('/').map(item => +item);
          parents.pop();
          this.keysQueue.push(...parents);
          console.log(this.keysQueue)
          this.keysQueue.forEach(item => {
            const targetIndex = targetKeys.findIndex(key => key === item);
            if (targetIndex >= 0) {
              targetKeys.splice(targetIndex, 1);
            }
          })
          this.setState({
            selectedRowKeys: targetKeys
          }, () => this.keysQueue = [])
        }
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        const rowKeys = selectedRows.map(item => item.key)
        this.setState({
          selectedRowKeys: rowKeys
        })
      },
    };
    return (
      <div style={{ paddingLeft: 100 }}>
        <Steps progressDot direction="vertical">
          <Step status="finish" description="You can hover on the dot." />
          <Step status="finish" description="You can hover on the dot." />
          <Step status="finish" description="You can hover on the dot." />
          <Step status="finish" description="You can hover on the dot." />
        </Steps>
        <Table columns={columns} rowSelection={rowSelection} dataSource={data} />
      </div>
    )
  }
}
