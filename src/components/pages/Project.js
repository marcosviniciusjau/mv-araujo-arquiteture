import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Loading from '../layouts/Loading'
import Containers from '../layouts/Container'
import ProjectForm from '../projects/ProjectForm'
import Message from '../layouts/Message'

function Project(){
  const { id } = useParams()
  const [project,setProject]= useState([])
  const [showProjectForm,setShowProjectForm]= useState(false)
  const [message, setMessage] = useState()
  const [type,setType]= useState()
  
useEffect(()=>{
  setTimeout(()=>fetch(`http://localhost:5000/projects/${id}`,{
    method:'GET',
    headers:{
     'Content-Type':'aplication/json'
   },
   }).then(resp=> resp.json())
     .then(data=> {
      setProject(data)
    
   })
    .catch(err=> console.log(err)
    ),300)
  },[id])

  function editPost(project){
    if(project.budget < project.cost){
      setMessage('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }
    
    fetch(`http://localhost:5000/projects/${id}`,{
      method:'PATCH',
      headers:{
       'Content-Type':'aplication/json'
     },
        body: JSON.stringify(project),
     }).then(resp=> resp.json())
       .then(data=> {
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto atualizado!')
        setType('sucess')
      
     })
      .catch(err=> console.log(err))
    }
  

  function toogleProjectForm(){
    setShowProjectForm(!showProjectForm)
  }

    return(<>
    {project.name ? (
     <div className={styles.project_details}>
      <Containers customClass="column">
        {message && <Message type={type} msg={message}/>}
        <div className={styles.details_container}>
          <h1> Projeto: {project.name}</h1>
          <button className={styles.btn} onClick={toogleProjectForm}>
           {!showProjectForm ? 'Editar Projeto': 'Fechar'}
            </button>
            {!showProjectForm ? (
            <div className={styles.project_info}>
              <p>
                <span>Categoria:</span> {project.category.name}
                </p>
           
                <p>
                  <span>Total do orçamento:
                    </span> R${project.budget}
                  </p>
                  <p>
                  <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
                 ) : (
                  <div className={styles.project_info}>
                    <ProjectForm 
                    handleSubmit={editPost} 
                    btnText="Concluir edição"
                    projectData={project}/>
                    </div>
            )}
        </div>
      </Containers>
      </div>
    ): (
      <Loading/>
    )}
    </>
    )
}

export default Project