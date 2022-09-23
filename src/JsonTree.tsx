import { Tree } from '@arco-design/web-react'

const data = {
  test: '123',
  obj: {
    key123: 'value123',
    rightKey: {
      key123: 'value123',
      key123456: {
        test: 1,
      },
    },
  },
  // arr: [
  //   {
  //     test: 'one',
  //   },
  // ],
}

const arrData = [
  {
    key: 'test',
    value: '123',
    keyErrorMsgs: [],
    valueErrorMsgs: [],
    entireErrorMsgs: [],
  },
  {
    key: 'obj',
    value: undefined,
    exception: true,
    entireErrorMsgs: ['不能超过 50 个字符'],
    children: [
      {
        key: 'key123',
        keyErrorMsgs: ['不能包含数字'],
        value: 'value123',
        valueErrorMsgs: ['不能包含数字'],
        exception: true,
      },
      {
        key: 'rightKey',
        entireErrorMsgs: ['不能超过 10 个字符'],
        exception: true,
        children: [
          {
            key: 'key1234',
            value: 'value123',
            valueErrorMsgs: ['不能包含数字'],
            exception: true,
          },
          {
            key: 'key123456',
            children: [
              {
                key: 'test1',
                value: '1',
              },
            ],
          },
        ],
      },
    ],
  },
]

const rule = {
  test: true,
  obj: {
    key123: { keyErrorMsg: '不能包含数字', keyUnexpectedType: true, valueUnexpectedType: false },
    rightKey: {
      // 给某个key的对象使用
      __detected_result__: {
        errorMsgs: ['超过 1000 个字符', 'key-value 超过 50 个'],
      },
      key123: {
        keyErrorMsg: '不能包含数字',
        keyUnexpectedType: true,
      },
      key123456: {
        test: {
          valueUnexpectedType: true,
          valueErrorMsg: '类型不能为Number',
        },
      },
    },
  },
  // arr: [
  //   {
  //     test: {},
  //   },
  // ],
}
const TreeNode = Tree.Node
const generatorTreeNodes = (treeData: typeof arrData) => {
  return treeData.map(item => {
    const { children, key, value, keyErrorMsgs, valueErrorMsgs, ...rest } = item
    console.log('item', item, children)
    let title = `${key}${children ? '' : ':' + value}`
    if (keyErrorMsgs && keyErrorMsgs.length > 0) {
      title += keyErrorMsgs.join(',')
    }
    if (valueErrorMsgs && valueErrorMsgs.length > 0) {
      title += valueErrorMsgs.join(',')
    }
    return (
      <TreeNode key={key} title={title}>
        {children && generatorTreeNodes(item.children as any)}
      </TreeNode>
    )
  })
}
export default function JsonTree() {
  return <Tree showLine>{generatorTreeNodes(arrData)}</Tree>
}
