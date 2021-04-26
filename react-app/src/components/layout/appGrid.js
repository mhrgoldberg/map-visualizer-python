import React from 'react'
import styled from 'styled-components'

export default function AppGrid() {
  return (
    <Grid>
      <div></div>
    </Grid>
  )
}

const Grid = styled.div`
  width: 100vw;
  margin: auto;
  div {
    max-width: 120rem;
    width: 90%;
    display: grid;
    grid-template-columns: 200px, 1fr;
    /* grid-template-rows: 200px, 1fr; */
  }
`
