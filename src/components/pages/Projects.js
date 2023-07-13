import { useLocation } from 'react-router-dom'

import Message from '../layouts/Message'

import styles from './Projects.module.css'
import  Containers  from '../layouts/Container'
import LinkButton  from '../layouts/LinkButton'
function Projects(){

    const location= useLocation()
    let message= ''

    if(location.state){
        message = location.state.message
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
            <h1> Meus projetos</h1>
            <LinkButton to="/newproject" text="Criar projeto"/>
       
            </div>
   
    {message && <Message  type="sucess" msg={message} />}
    <Containers customClass="start">
        <p>Projetos..</p>
    </Containers>
    </div>
    )
}
export default Projects