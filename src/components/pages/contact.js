import React from "react"
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhone } from "react-icons/fa"
import styles from './Contact.module.css'
import contact from '../../img/contato.png'
function Contact() {
  return (
    <>
      <div>
        <h1>Contato</h1>
        <p>
          Entre em contato conosco para discutir seus projetos de arquitetura.
        </p>
        <ul className={styles.contact_info}>
          <li className={styles.phone}>
            <FaPhone />
            <p>Telefone: (14) 97555-1234</p>
          </li>
          <br />
          <li className={styles.whatsapp}>
            <FaWhatsapp />
            <p>WhatsApp: (14) 97555-5678</p>
          </li>
          <br />
          <li className={styles.facebook}>
            <FaFacebook />

            <p>Siga-nos no Facebook</p>
          </li>
          <br />
          <li className={styles.instagram}>
            <FaInstagram />
            <p>Siga-nos no Instagram</p>
            <br />
          </li>
        </ul>
      </div>
      <aside className="contact-img">
        <img
          src={contact}
          className="contact"
          width={"500px"}
          alt="contact-img"
        />
      </aside>
    </>
  )
}

export default Contact
