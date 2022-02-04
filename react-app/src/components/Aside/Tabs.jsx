import React from 'react'
import styled from 'styled-components'

export default function Tabs({ setViewType, viewType, CHOICES }) {
  const clickWorkout = () => {
    setViewType(CHOICES.WORKOUT)
  }

  const clickRoute = () => {
    setViewType(CHOICES.ROUTE)
  }

  return (
    <ToggleContainer viewType={viewType} CHOICES={CHOICES}>
      <div className="routeTab" onClick={clickRoute}>
        {CHOICES.ROUTE}
      </div>
      <div className="workoutTab" onClick={clickWorkout}>
        {CHOICES.WORKOUT}
      </div>
    </ToggleContainer>
  )
}

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 31rem;
  height: 5rem;
  font-size: 3rem;

  div {
    display: flex;
    align-items: baseline;
    justify-content: center;
    width: 50%;
    border: 0.3rem solid var(--primary-cyan);
    border-radius: 1rem 1rem 0 0;
    border-bottom: none;
    padding: 0.5rem;
  }

  .workoutTab {
    border-right: ${({ viewType, CHOICES }) =>
      viewType === CHOICES.WORKOUT
        ? '0.3rem solid var(--primary-cyan)'
        : 'none'};
    border-top: ${({ viewType, CHOICES }) =>
      viewType === CHOICES.WORKOUT
        ? '0.3rem solid var(--primary-cyan)'
        : 'none'};
    border-left: ${({ viewType, CHOICES }) =>
      viewType === CHOICES.WORKOUT
        ? '0.3rem solid var(--primary-cyan)'
        : 'none'};
    background: ${({ viewType, CHOICES }) =>
      viewType === CHOICES.WORKOUT
        ? 'var(--secondary-dark)'
        : 'var(--primary-dark)'};
  }

  .routeTab {
    border-right: ${({ viewType, CHOICES }) =>
      viewType === CHOICES.ROUTE ? '0.3rem solid var(--primary-cyan)' : 'none'};
    border-top: ${({ viewType, CHOICES }) =>
      viewType === CHOICES.ROUTE ? '0.3rem solid var(--primary-cyan)' : 'none'};
    border-left: ${({ viewType, CHOICES }) =>
      viewType === CHOICES.ROUTE ? '0.3rem solid var(--primary-cyan)' : 'none'};
    background: ${({ viewType, CHOICES }) =>
      viewType === CHOICES.WORKOUT
        ? 'var(--primary-dark)'
        : 'var(--secondary-dark)'};
  }
`
