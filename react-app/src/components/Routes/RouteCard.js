import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
export default function RouteCard({ route }) {
  return (
    <RouteLi>
      <NavLink to={`/routes/${route.id}`}>
        <h3>{route.title}</h3>
      </NavLink>
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
  margin: 0.5rem 0;
  overflow: hidden;
  background: var(--secondary-dark);

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
    font-size: 1.4rem;
    border-radius: 0.3rem;
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

  a {
    grid-area: title;
    justify-self: center;
  }
  img {
    grid-area: img;
  }
`
