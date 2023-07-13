import { Link } from 'react-router-dom'
import Containers from './Container';
import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'
function Navbar(){
  return(<nav className={styles.navbar}>
    <Containers>
        <Link to="/">
            <img src={logo} alt="Costs"/>
        </Link>
        <ul className={styles.list}>
        <li className={styles.item}>
            <Link to="/">Home</Link>
            </li>
            <li className={styles.item}>
            <Link to="/Projects">Projects</Link>
            </li>
      <li className={styles.item}>
         <Link to="/Company">Empresa</Link>
      </li>

      <li className={styles.item}>
        <Link to="/Contact">Contato</Link>
        </li>

     
        </ul>
     
        </Containers>
  </nav>)
}
export default Navbar;