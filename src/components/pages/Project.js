import {parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Loading from '../layouts/Loading'
import Containers from '../layouts/Container'
import ProjectForm from '../projects/ProjectForm'
import Message from '../layouts/Message'
import ServiceForm from '../services/service-form'

function Project(){
  const { id } = useParams()
  const [project,setProject]= useState([])
  const [showProjectForm,setShowProjectForm]= useState(false)
  const [message, setMessage] = useState()
  const [type,setType]= useState()
  const [showServiceForm, setShowServiceForm] = useState(false)
  
useEffect(()=>{
  setTimeout(()=>fetch(`http://localhost:5000/projects/${id}`,{
    method:'GET',
    headers:{
     'Content-Type':'application/json'
   },
   }).then(resp=> resp.json())
     .then(data=> {
      setProject(data)
    
   })
    .catch(err=> console.log(err)
    ),300)
  },[id])

  function editPost(project){
    setMessage('')
    if(project.budget < project.cost){
      setMessage('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }
    
    fetch(`http://localhost:5000/projects/${id}`,{
      method:'PATCH',
      headers:{
       'Content-Type':'application/json'
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
  
  function createService(project){
    const lastService= project.services[project.services.length -1]
    lastService.id= uuidv4()

    const lastServiceCost= lastService.cost
    const newCost= parseFloat(project.cost) + parseFloat(lastServiceCost)

    if(newCost > parseFloat(project.budget)){
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      project.services.pop()
      return false
    }
    project.cost= newCost

    fetch(`http://localhost:5000/project/${project.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      }
    })
  }

  function toogleProjectForm(){
    setShowProjectForm(!showProjectForm)
  }

    function toogleServiceForm() {
      setShowServiceForm(!showServiceForm)
    }

    return (
      <>
        {project.name ? (
          <div className={styles.project_details}>
            <Containers customClass="column">
              {message && <Message type={type} msg={message} />}
              <div className={styles.details_container}>
                <h1> Projeto: {project.name}</h1>
                <button className={styles.btn} onClick={toogleProjectForm}>
                  {!showProjectForm ? "Editar Projeto" : "Fechar"}
                </button>
                {!showProjectForm ? (
                  <div className={styles.project_info}>
                    <p>
                      <span>Categoria:</span> {project.category.name}
                    </p>

                    <p>
                      <span>Total do orçamento:</span> R$ {project.budget}
                    </p>
                    <p>
                      <span>Total Utilizado:</span> R$ {project.cost}
                    </p>
                  </div>
                ) : (
                  <div className={styles.project_info}>
                    <ProjectForm
                      handleSubmit={editPost}
                      btnText="Concluir edição"
                      projectData={project}
                    />
                  </div>
                )}
                 </div>
                <div className={styles.service_form_container}>
                  <h2>Adicione um serviço</h2>
                  <button className={styles.btn} onClick={toogleServiceForm}>
                    {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
                  </button>
                  <div className={styles.project_info}>
                    {showServiceForm && (
                    <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                    />)}
                 
                </div>
              </div>
              <h2>Serviços</h2>
              <Containers customClass="start">
                <p>Items de Serviços</p>
              </Containers>
            </Containers>
          </div>
        ) : (
          <Loading />
        )}
      </>
    )
}

export default Project