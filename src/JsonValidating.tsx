import React from 'react'
import ReactJson from 'react-json-view'

const test = {
  ev_type: 'http',
  payload: {
    api: 'fetch',
    request: {
      method: 'post',
      timestamp: 1664102120911,
      url: 'https://slardar.bytedance.net/api_web/flex/store/save?lang=zh',
      headers: {},
    },
    response: {
      is_custom_error: false,
      status: 200,
      headers: {},
      timestamp: 1664102120961,
      timing: {},
    },
    duration: 50,
  },
  common: {
    bid: 'slardar_web',
    pid: 'JS 监控列表',
    view_id: 'JS 监控列表_1664102113768',
    user_id: 'chenjinhuo',
    device_id: '8555f799-1ab7-4113-9c34-19a4bbfb596a',
    session_id: '15e633da-0ca8-4554-adc4-2598f8ecdbb0',
    release: 'v2.2.120',
    env: 'production',
    url: 'https://slardar.bytedance.net/node/web/js?env=Slardar_All&bid=experience_c&start_time=1647743344&end_time=1648002544&lang=zh&site_type=web&current_error_page=1&layout=normal&filter_id=bb61e626b8d955994509f73fd07eb639',
    timestamp: 1664102120911,
    sdk_version: '1.1.3',
    sdk_name: 'SDK_SLARDAR_WEB',
    context: {},
    network_type: '4g',
    action_id: 'b9d4de8e-8c2e-40f5-a4f4-7409db1a7491',
    sdk_offset: 21,
    sample_rate: 1,
  },
}
const KeyWrapper: React.FC<{ children: React.ReactNode; path: string }> = ({ children, path }) => {
  console.log('KeyWrapper', path)
  return <div style={{ textDecoration: 'underline', textDecorationColor: 'blue' }}>{children}</div>
}
const ValueWrapper: React.FC<{ children: React.ReactNode; path: string }> = ({ children, path }) => {
  console.info('ValueWrapper', path)
  return <div style={{ textDecoration: 'underline', textDecorationColor: 'red' }}>{children}</div>
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
