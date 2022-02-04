import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { logout } from '../../../store/auth'

export default function LogoutButton() {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout())
  }
  return (
    <Div>
      <svg
        onClick={onLogout}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-log-out"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </Div>
  )
}

const Div = styled.div`
  width: 5rem;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.2rem solid transparent;
  svg:hover {
    color: var(--primary-cyan);
    cursor: pointer;
  }

  @media only screen and (max-width: 550px) {
    svg {
      width: 2.8rem;
    }
  }
`
