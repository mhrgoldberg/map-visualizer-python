import React from 'react'
import styled from 'styled-components'

export default function Dashboard() {
  return (
    <Grid>
      <aside></aside>
    </Grid>
  )
}

const Grid = styled.div`
  width: 100vw;
  min-height: calc(100vh - 6rem);
  display: grid;
  grid-template-columns: 20rem, 1fr;
`
