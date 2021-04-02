import React from 'react'
import styled from 'styled-components'

export default function PhotoSideBanner() {
  const randomNumber = (limit) => {
    return Math.floor(Math.random() * limit) + 1
  }

  const digits = Array.from({ length: 11 }, () => {
    return [randomNumber(3), randomNumber(3)]
  }).concat([
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1]
  ])

  return (
    <Container>
      {digits.map(([h, v], i) => {
        return (
          <div className={`imgContainer h${h} v${v}`}>
            <img src={`pictures/loginGallery${i + 1}.jpeg`} />
          </div>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  * {
    box-sizing: border-box;
  }
  display: grid;
  width: 100%;
  height: 20rem;
  grid-template-columns: repeat(auto-fill, 10rem);
  /* grid-template-rows: 10rem 10rem 10rem; */
  grid-auto-flow: dense;
  border-radius: 1rem;
  filter: brightness(0.7);
  /* max-height: 150rem; */
  overflow: hidden;

  .imgContainer.v2 {
    grid-row: span 2;
  }

  .imgContainer.v3 {
    grid-row: span 3;
  }

  /* .imgContainer.v4 {
    grid-row: span 4;
  } */

  .imgContainer.h2 {
    grid-column: span 2;
  }

  .imgContainer.h3 {
    grid-column: span 3;
  }

  /* .imgContainer.h4 {
    grid-column: span 4;
  } */

  .imgContainer {
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    img {
      grid-column: 1 / -1;
      grid-row: 1 / -1;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
