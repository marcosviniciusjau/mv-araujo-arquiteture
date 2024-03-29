import { useNavigate } from "react-router-dom"

import ProjectForm from "../project/ProjectForm"

import styles from "./NewProject.module.css"
import { useState } from "react"

function NewProject() {

  const history = useNavigate()

  function createPost(project) {
  
    project.cost = 0
    project.services = []

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        history("/projects", {
          state: { message: "Projeto enviado com sucesso" },
        })
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os acréscimos</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
    </div>
  )
}
export default NewProject
