import { useLocation } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Message from '../layouts/Message'

import styles from './Projects.module.css'
import  Containers  from '../layouts/Container'
import Loading from '../layouts/Loading';
import LinkButton  from '../layouts/LinkButton'
import ProjectCard from '../projects/ProjectCard'

function Projects(){

   const [projects,setProjects] = useState([])
   const [removeLoading,setRemoveLoading]= useState(false)

   const location= useLocation()
    let message= ''

    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
     setTimeout(()=>{  
        fetch('http://localhost:5000/projects',{
        method:"GET",
        headers:{
            'Content-Type':'aplication/json',
        },
    }).then(resp=> resp.json())
    .then(data=>{
        console.log(data)
        setProjects(data)
        setRemoveLoading(true)
    })
    .catch(err=> console.log(err))
    },300)
    },[])
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
            <h1> Meus projetos</h1>
            <LinkButton to="/newproject" text="Criar projeto"/>
       
            </div>
   
    {message && <Message  type="sucess" msg={message} />}
    <Containers customClass="start">
    {projects.length > 0 &&
     projects.map((project) =>(
    <ProjectCard
     id={project.id}
     name={project.name}
     budget={project.budget}
     category={project?.category?.name}
     key={project.id}/>
     ))}
     
    {!removeLoading && <Loading/>}
    {removeLoading && projects.length ===0 && (
    <p>Não há projetos cadastrados</p>
    )}

    </Containers>
    </div>
    )
}
export default Projects