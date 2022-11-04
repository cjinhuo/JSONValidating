import styled from '@emotion/styled'
import React from 'react'

const TitleWrapper = styled.div`
  font-size: 20px;
  font-weight: 500;
`
export default function HeaderContent() {
  return (
    <div>
      <TitleWrapper>Thrift To JSON Schema</TitleWrapper>
    </div>
  )
}
