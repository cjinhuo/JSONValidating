import { Tooltip } from '@arco-design/web-react'
import { ErrorObject } from 'ajv/dist/types'
import React from 'react'
import ReactJson from 'react-json-view'

const test = {
  ev_type: 1,
  payload: {
    api: 'request',
    duration: 11,
    payload_extra: {
      test: {},
    },
    extra: {
      tttt: '12312',
      a: 1,
      b: '2',
      c: '3',
    },
  },
  extra: {},
}
const errors = [
  {
    instancePath: '/ev_type',
    schemaPath: '#/properties/ev_type/type',
    keyword: 'type',
    params: { type: 'string' },
    message: 'must be string',
  },
  {
    instancePath: '/payload',
    schemaPath: '/HttpPayload/additionalProperties',
    keyword: 'additionalProperties',
    params: { additionalProperty: 'payload_extra' },
    message: 'must NOT have additional properties',
  },
  {
    instancePath: '/payload/extra/a',
    schemaPath: '/HttpPayload/properties/extra/patternProperties/./type',
    keyword: 'type',
    params: { type: 'string' },
    message: 'must be string',
  },
  {
    instancePath: '/payload/extra',
    schemaPath: '/HttpPayload/properties/extra/errorMessage',
    keyword: 'errorMessage',
    params: {
      errors: [
        {
          instancePath: '/payload/extra',
          schemaPath: '/HttpPayload/properties/extra/maxProperties',
          keyword: 'maxProperties',
          params: { limit: 3 },
          message: 'must NOT have more than 3 properties',
          emUsed: true,
        },
      ],
    },
    message: '键值对不能超过 3 对',
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
const isObject = (param: unknown) => typeof param === 'object'

const getErrorsWithPath = (errors: ErrorObject[], currentPath: string) => {
  const targetErrors = errors.filter(item => item.instancePath === currentPath)
  return targetErrors
}
const ErrorStyle = { backgroundColor: '#FDDDE1', borderBottom: '2px solid #EA1537' }

const KeyWrapper: React.FC<{ children: React.ReactNode; path: string }> = ({ children, path }) => {
  const finalPath = `/${path}`
  const errorArr = getErrorsWithPath(errors, finalPath)
  const isError = errorArr.length > 0
  const errorMsgs = errorArr.map(item => item.message).join('/n')
  return isError ? (
    <div className='KeyWrapper' style={{ display: 'inline-block', ...ErrorStyle }}>
      <Tooltip content={errorMsgs}>{children}</Tooltip>
    </div>
  ) : (
    <div style={{ display: 'inline-block' }}>{children}</div>
  )
}
const ValueWrapper: React.FC<{ children: React.ReactNode; path: string }> = ({ children, path }) => {
  return (
    <div className='ValueWrapper' style={{ display: 'inline-block' }}>
      {children}
    </div>
  )
}
export default function JsonValidating() {
  return (
    <ReactJson
      src={test}
      KeyWrapper={KeyWrapper}
      ValueWrapper={ValueWrapper}
      onEdit={item => {
        console.log('item', item)
        return true
      }}></ReactJson>
  )
}
