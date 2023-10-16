import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'
import logo from '../../img/casa-nova-flat-icon.png'

function Footer(){
    return <footer className={styles.footer}> 
        <ul className={styles.social_list}>
            <li>
                <FaFacebook/>
            </li> 
            <li>
                <FaInstagram/>
            </li> 
            <li>
                <FaLinkedin/>
            </li> 
            </ul>
            <p className={styles.copy_right}><img src={logo} className={styles.img}/><span>MV Araújo Arquitetura </span> &copy; 2023</p>
            </footer>
}
export default Footer;