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
    exception: true,
    entireErrorMsgs: ['不能超过 50 个字符'],
    value: [
      {
        key: 'key123',
        keyErrorMsgs: ['不能包含数字'],
        value: 'value123',
        valueErrorMsgs: ['不能包含数字'],
        exception: true,
      },
      {
        key: 'rightKey',
        entireErrorMsgs: ['不能超过 10 个对象'],
        exception: true,
        value: [
          {
            key: 'key1234',
            value: 'value123',
            valueErrorMsgs: ['不能包含数字'],
            exception: true,
          },
          {
            key: 'key123456',
            value: [
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

const test = [
  {
    key: 'ev_type',
    keyErrorMsgs: [],
    valueErrorMsgs: ['must be string'],
    entireErrorMsgs: [],
    value: 1,
    path: '/ev_type',
    exception: true,
  },
  {
    key: 'payload',
    keyErrorMsgs: [],
    valueErrorMsgs: [],
    entireErrorMsgs: ['must NOT have additional properties'],
    value: [
      {
        key: 'api',
        keyErrorMsgs: [],
        valueErrorMsgs: [],
        entireErrorMsgs: [],
        value: 'request',
        path: '/payload/api',
      },
      {
        key: 'duration',
        keyErrorMsgs: [],
        valueErrorMsgs: [],
        entireErrorMsgs: [],
        value: 11,
        path: '/payload/duration',
      },
      {
        key: 'payload_extra',
        keyErrorMsgs: [],
        valueErrorMsgs: [],
        entireErrorMsgs: ['must NOT have additional properties'],
        value: [
          {
            key: 'test',
            keyErrorMsgs: [],
            valueErrorMsgs: [],
            entireErrorMsgs: [],
            value: [],
            path: '/payload/payload_extra/test',
          },
        ],
        path: '/payload/payload_extra',
        exception: true,
      },
      {
        key: 'extra',
        keyErrorMsgs: [],
        valueErrorMsgs: [],
        entireErrorMsgs: ['must NOT have additional properties'],
        value: [
          {
            key: 'tttt',
            keyErrorMsgs: [],
            valueErrorMsgs: [],
            entireErrorMsgs: [],
            value: '12312',
            path: '/payload/extra/tttt',
          },
          {
            key: 'a',
            keyErrorMsgs: [],
            valueErrorMsgs: ['must be string'],
            entireErrorMsgs: [],
            value: 1,
            path: '/payload/extra/a',
            exception: true,
          },
          {
            key: 'b',
            keyErrorMsgs: [],
            valueErrorMsgs: [],
            entireErrorMsgs: [],
            value: '2',
            path: '/payload/extra/b',
          },
          {
            key: 'c',
            keyErrorMsgs: [],
            valueErrorMsgs: [],
            entireErrorMsgs: [],
            value: '3',
            path: '/payload/extra/c',
          },
        ],
        path: '/payload/extra',
        exception: true,
      },
    ],
    path: '/payload',
    exception: true,
  },
  {
    key: 'extra',
    keyErrorMsgs: [],
    valueErrorMsgs: [],
    entireErrorMsgs: ['must NOT have additional properties'],
    value: [],
    path: '/extra',
    exception: true,
  },
  {
    key: 'HttpPayload',
    keyErrorMsgs: [],
    valueErrorMsgs: [],
    entireErrorMsgs: [],
    value: [],
    path: '/HttpPayload',
    exception: true,
  },
]

interface JsonItemType {
  key: string
  value: string | Object
  keyErrorMsgs: string[]
  valueErrorMsgs: string[]
  entireErrorMsgs: string[]
  path: string
  exception?: boolean
}
const TreeNode = Tree.Node
const isObject = (param: unknown) => typeof param === 'object'
const generatorTreeNodes = (treeData: JsonItemType[]) => {
  return treeData.map(item => {
    const { key, path, value, keyErrorMsgs, valueErrorMsgs, entireErrorMsgs } = item

    let title = `${key}${isObject(value) ? '' : ':' + value}`
    if (keyErrorMsgs && keyErrorMsgs.length > 0) {
      title += keyErrorMsgs.join(',')
    }
    if (valueErrorMsgs && valueErrorMsgs.length > 0) {
      title += valueErrorMsgs.join(',')
    }
    if (entireErrorMsgs && entireErrorMsgs.length > 0) {
      title += entireErrorMsgs.join(',')
    }
    return (
      <TreeNode key={path} title={title}>
        {isObject(value) && generatorTreeNodes(item.value as any)}
      </TreeNode>
    )
  })
}
export default function JsonTree() {
  return <Tree showLine>{generatorTreeNodes(test)}</Tree>
}
