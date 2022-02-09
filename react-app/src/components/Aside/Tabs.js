import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { toggleAside } from '../../store/ui'

export default function Tabs({ setViewType, viewType, CHOICES }) {
  const isAsideOpen = useSelector(({ ui }) => ui.aside)
  const dispatch = useDispatch()
  const clickWorkout = () => {
    setViewType(CHOICES.WORKOUT)
    if (!isAsideOpen) dispatch(toggleAside())
  }

  const clickRoute = () => {
    setViewType(CHOICES.ROUTE)
    if (!isAsideOpen) dispatch(toggleAside())
  }

  return (
    <ToggleContainerOpen
      isAsideOpen={isAsideOpen}
      viewType={viewType}
      CHOICES={CHOICES}
    >
      <div
        className={isAsideOpen ? 'routeTab open' : 'routeTab closed'}
        onClick={clickRoute}
      >
        {isAsideOpen ? CHOICES.ROUTE : 'R'}
      </div>
      <div
        className={isAsideOpen ? 'workoutTab open' : 'workoutTab closed'}
        onClick={clickWorkout}
      >
        {isAsideOpen ? CHOICES.WORKOUT : 'W'}
      </div>
    </ToggleContainerOpen>
  )
}

const ToggleContainerOpen = styled.div`
  display: flex;
  flex-direction: ${({ isAsideOpen }) => (isAsideOpen ? 'row' : 'column')};
  width: ${({ isAsideOpen }) => (isAsideOpen ? '31rem' : '7rem')};
  height: ${({ isAsideOpen }) => (isAsideOpen ? '5rem' : '10rem')};
  border-top: ${({ isAsideOpen }) =>
    isAsideOpen ? 'none' : '0.3rem solid var(--secondary-dark)'};
  font-size: 3rem;
  transition: all 0.4s;

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
    cursor: ${({ viewType, CHOICES }) =>
      viewType === CHOICES.WORKOUT ? '' : 'pointer'};
    transition: all 0.2s;
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
    cursor: ${({ viewType, CHOICES }) =>
      viewType === CHOICES.ROUTE ? '' : 'pointer'};
    transition: all 0.2s;
  }

  .closed {
    border: none;
    background: None;
    width: 100%;
    cursor: pointer;
  }

  .closed:hover {
    color: var(--primary-cyan);
  }
`
