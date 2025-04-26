import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}

const Timesheet = (props: Props) => {
  let navigate = useNavigate();
  return (
    <button onClick={() => {
      localStorage.removeItem('token')
      navigate("/login")
    }}>
      logout
    </button>
  )
}

export default Timesheet