import useWindowSize from './hooks/useWindowSize'
import { FaMobileAlt, FaTabletAlt, FaLaptop } from 'react-icons/fa'

const Header = ({ title }) => {
  const { width } = useWindowSize()
  return (
    <header className='Header'>
      <h1>{title}</h1>
      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 1024 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  )
}

export default Header
