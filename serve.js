const express = require("express")
const { randomUUID } = require("crypto")
const { request } = require("http")
const app = express()
const Banco = require('./Banco')
app.use(express.json())
const banco = new Banco();

app.listen(3333, () => {
  console.log("Servidor foi iniciado!")
});

//Vetor Alunos Para Armazenar s
alunos = []

//Metodo Get Para Listar Aluno
app.get("/alunos", async (request, response) => {
  const {id} = request.query
  //if (uuid) {
    //const pos = alunos.findIndex((alunos) => alunos.uuid == uuid)
    //if (pos >= 0) return response.json(aluno[pos])
 // }
  const lista = await banco.listar()
  return response.json(lista)
})

//Metodo Post Para Criar Aluno
app.post("/alunos", (request, response) => {
  const { nome, email } = request.body
  const uuid = randomUUID()
  const aluno = {
    uuid,
    nome,
    email,
  }
  banco.inserir(aluno)
  //alunos.push(aluno)
  return response.json(aluno)
});

//Metodo Post Para Deletar Aluno
app.delete("/alunos/:id", async (request, response) => {
  const { id } = request.params
  const ID = await banco.verificar(id)
  //const pos = alunos.findIndex((aluno) => aluno.uuid == uuid)
  //const aluno = alunos[pos]
   if (ID == "") 
     return response.status(400).json({ mensagem: "Aluno não encontrado" })
  // alunos.splice(pos, 1)
  banco.remover(id)
  //return response.json({ messagem: "Removido!" })
  return response.json({ messagem: "Removido!" })
});

//Metodo Post Para Atualizar Aluno
app.put("/alunos/:id", async (request, response) => {
  const { id } = request.params
  const { nome, email } = request.body
  const ID = await banco.verificar(id)
  //const pos = alunos.findIndex((aluno) => aluno.uuid == uuid)
  if (ID == "")
    return response.status(400).json({ mensagem: "Aluno não encontrado" })

 const aluno = {
   id,
   nome,
   email,
 }
 banco.atualizar(aluno)
  //alunos[pos] = aluno
  return response.json({ messagem: "Atualizado!" })
  
}); 