import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import Message from "../layouts/Message"

import styles from "./Projects.module.css"
import Containers from "../layouts/Container"
import Loading from "../layouts/Loading"
import LinkButton from "../layouts/LinkButton"
import ProjectCard from "../project/ProjectCard"

function Projects() {
  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('')

  const location = useLocation()
  let message = ''
  if (location.state) {
    message = location.state.message
  }

  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch("http://localhost:5000/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProjects(data)
            setRemoveLoading(true)
          }),
      100
    )
  }, [])

   function removeProject(id) {
     fetch(`http://localhost:5000/projects/${id}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
       },
     })
       .then((resp) => resp.json())
       .then((data) => {
         setProjects(projects.filter((project) => project.id !== id))
         setProjectMessage("Projeto removido com sucesso!")
       })
   }


  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar projeto" />
      </div>

      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Containers customClass="start">
        {projects.length > 0 &&
          projects.map((project) => {
            return (
              <ProjectCard
                id={project.id}
                name={project.name}
                budget={project.budget}
                category={project?.category?.name}
                key={project.id}
                handleRemove={removeProject}
              />
            )
          })}
        {!removeLoading && <Loading />}

        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Containers>
    </div>
  )
}

export default Projects
