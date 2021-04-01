import React from 'react'
import styled from 'styled-components'

export default function NavListItem(props) {
  return <Li {...props} />
}

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`
