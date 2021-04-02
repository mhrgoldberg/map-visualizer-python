import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth'

export default function LogOutButton() {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    dispatch(logout())
  }

  return <button onClick={onLogout}>Logout</button>
}
