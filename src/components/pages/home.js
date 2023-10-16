import styles from './Home.module.css'
import savings from '../../img/inovacao.png'
import LinkButton  from '../layouts/LinkButton'
function Home(){
    return <section className={styles.home_container}>
        <h1> Bem-vindo á <span>MV Araújo Arquitetura</span></h1>
        <p>Comece a gerenciar os seus projetos agora mesmo</p>
        <LinkButton to="/newproject" text="Criar projeto"/>
       
        <img src={savings} alt="flat-icon"/>
    </section>
}
export default Home