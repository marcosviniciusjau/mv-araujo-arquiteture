import { parse, v4 as uuidv4 } from "uuid"

import styles from "./Project.module.css"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Loading from "../layouts/Loading"
import Containers from "../layouts/Container"
import ProjectForm from "../project/ProjectForm"
import Message from "../layouts/Message"
import ServiceForm from "../service/ServiceForm"
import ServiceCard from "../service/ServiceCard"

function Project() {
  const { id } = useParams()
  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  const [showServiceForm, setShowServiceForm] = useState(false)

  useEffect(() => {
    setTimeout(
      () =>
        fetch(`http://localhost:5000/projects/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            setServices(data.services)
          }),
         
      0
    )
  }, [id])

  function editPost(project) {
    
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!")
      setType("error")
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(false)
        setMessage("Projeto atualizado!")
        setType("success")
      })
      
  }

  function createService(project) {


    const lastService = project.services[project.services.length - 1]
    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    if (newCost > parseFloat(project.budget)) {
      setShowServiceForm(false)
      setMessage("Orçamento ultrapassado, verifique o valor do serviço!")
      setType("error")
      project.services.pop()
      return false
    }
    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data.services)
        setShowServiceForm(false)
        setType("success")
        
      })

  }

  function removeService(id,cost) {

   const servicesUpdated= project.services.filter(
    (service) => service.id !== id
   )
  
   const projectUpdated= project

   projectUpdated.services= servicesUpdated
   projectUpdated.cost= parseFloat(projectUpdated.cost)- parseFloat(cost)
   fetch (`http://localhost:5000/projects/${projectUpdated.id}`,{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(projectUpdated)
   }).then((resp)=>resp.json())
     .then((data)=>{
      setProject(projectUpdated)
      setServices(servicesUpdated)
      setMessage('Acréscimo removido com sucesso!')
     })
     .catch(err => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
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
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>

                  <p>
                    <span>Total do orçamento: </span> R$ {project.budget}
                  </p>
                  <p>
                    <span>Total utilizado:</span> R$ {project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um acréscimo:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar Acréscimo" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar acréscimo"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Acréscimos:</h2>
            <Containers customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há acréscimos cadastrados.</p>}
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
