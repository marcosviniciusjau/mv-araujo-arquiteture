import React, { useState } from "react"
import { Spinner, Button } from "react-bootstrap"
import styles from "./Home.module.css"
import savings from "../../img/inovacao.png"
import banner1 from "../../img/banner1.png"
import comercial from "../../img/comercial.png"
import banner2 from "../../img/banner2.png"
import residencial from "../../img/residencial.png"
import lazer from "../../img/lazer.png"
import sustentavel from "../../img/sustentavel.png"
import LinkButton from "../layouts/LinkButton"
import dotcheio from "../../img/ponto_cheio.png"
import dotvazio from "../../img/ponto_vazio.png"

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const images = [banner1, banner2]

  return (
    <section className={styles.home_container}>
      <div className={styles.categories}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.imgs}
            style={{
              width: "100%",
              display: currentSlide === index ? "block" : "none",
            }}
          >
            <img src={image} className={styles.banner} />
          </div>
        ))}
      </div>
      <div className={styles.dots}>
        {images.map((image, index) => (
          <Button
            key={index}
            className={currentSlide === index ? "active" : ""}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">
              {currentSlide === index ? (
                <img src={dotcheio} />
              ) : (
                <img src={dotvazio} />
              )}
            </span>
          </Button>
        ))}
      </div>

      <h2> Sobre a MV Araújo Arquitetura:</h2>
      <section className={styles.about}>
        <img src={savings} className={styles.img} />
        <h3>
          {" "}
          Somos uma renomada empresa de arquitetura localizada em Jaú,
          <br></br> São Paulo.<br></br> Dedicada a transformar ideias e sonhos em
          realidade<br></br> por meio de projetos arquitetônicos excepcionais.
          <br></br>
          <br></br>
          Com um compromisso incansável com a excelência e a inovação,<br></br>{" "}
          atendemos a uma variedade de necessidades de design e construção.
        </h3>
      </section>
      <br></br>
      <h1 className={styles.titleCategories}>Categorias</h1>
      <section className={styles.categories}>
        <img src={comercial} className={styles.imgs} />
        <img src={sustentavel} className={styles.imgs} />
        <img src={lazer} className={styles.imgs} />
        <img src={residencial} className={styles.imgs} />
      </section>
      <section className={styles.names}>
        <p className={styles.name} id={styles.comercial}>
          Comercial
        </p>
        <p className={styles.name}> Sustentavel</p>
        <p className={styles.name} id={styles.lazer}>
          Lazer
        </p>
        <p className={styles.name} id={styles.residencial}>
          Residencial
        </p>
      </section>
      <p>Comece a gerenciar os seus projetos agora mesmo</p>
      <LinkButton to="/newproject" text="Começar" />
      <br></br>
    </section>
  )
}
export default Home
