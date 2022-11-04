import { Grid } from '@arco-design/web-react'
const Row = Grid.Row
const Col = Grid.Col
import JsonValidating from '../components/JsonValidating'

export default function MainContent() {
  return (
    <div>
      <Row>
        <Col span={24}>
          <div className='col-content'>
            <JsonValidating></JsonValidating>
          </div>
        </Col>
      </Row>
    </div>
  )
}
