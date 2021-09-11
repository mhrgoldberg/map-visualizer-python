import React from 'react'
import styled from 'styled-components'

export default function Dashboard() {
  return (
    <Grid>
      <aside>Hello</aside>
    </Grid>
  )
}

const Grid = styled.div`
  /* width: 100vw; */
  /* min-height: calc(100vh - 7rem); */
  display: grid;
  grid-template-columns: 20rem, 1fr;
`
