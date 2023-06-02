import React from 'react'
import useWindowSize from './hooks/useWindowSize'
import { FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa'

const Footer = () => {
  const today = new Date()
  const { width } = useWindowSize()
  return (
    <footer className='Footer'>
      <p>Copyright &copy; {today.getFullYear()} </p>
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 1024 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </footer>
  )
}

export default Footer
