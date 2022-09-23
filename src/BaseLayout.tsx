import { Grid } from '@arco-design/web-react'
import JsonTree from './JsonTree'
const Row = Grid.Row
const Col = Grid.Col
import JsonValidating from './JsonValidating'

export default function BaseLayout() {
  return (
    <div className='grid'>
      <Row>
        <Col span={12}>
          <div className='col-content'>
            <JsonTree></JsonTree>
          </div>
        </Col>
        <Col span={12}>
          <div className='col-content'>
            <JsonValidating></JsonValidating>
          </div>
        </Col>
      </Row>
    </div>
  )
}
