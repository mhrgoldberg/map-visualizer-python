import React from 'react'
import styled from 'styled-components'

export default function RouteCard({ route }) {
  return (
    <RouteLi>
      <h3>{route.title}</h3>
      <img src={route.img_url} alt="" />
      <p className="sport-type">
        <label>Sport Type</label>
        {route.sport_type}
      </p>
      <p className="distance">
        <label>Distance</label> {route.distance} miles
      </p>
      <p className="ascent">
        <label>Ascent</label> {route.ascent} ft
      </p>
      <p className="descent">
        <label>Descent</label> {route.descent} ft
      </p>
    </RouteLi>
  )
}

const RouteLi = styled.li`
  border-bottom: 0.3rem solid var(--primary-dark);
  border-radius: 2rem;
  overflow: hidden;
  background: var(--secondary-dark);
  /* padding: 0.5rem; */

  /* layout */
  display: grid;
  width: 100%;
  grid-template-areas:
    'img title title'
    'img sport-type distance'
    'img ascent descent';
  grid-template-columns: 153px auto auto;
  p {
    text-align: center;
    border-radius: 0.3rem;
    /* background: var(--primary-dark); */
    margin: 0.3rem;
    padding: 0.2rem;
    display: flex;
    justify-content: baseline;
    align-items: center;
    flex-direction: column;
    label {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-cyan);
    }
  }
  .sport-type {
    grid-area: sport-type;
    /* background: none;
    align-self: center;
    color: var(--primary-cyan);
    font-size: 2rem;
    font-weight: bold; */
  }
  .distance {
    grid-area: distance;
  }

  .ascent {
    grid-area: ascent;
  }

  .descent {
    grid-area: descent;
  }

  h3 {
    grid-area: title;
    justify-self: center;
  }
  img {
    /* border-right: 0.3rem solid var(--primary-dark); */
    grid-area: img;
  }
`
