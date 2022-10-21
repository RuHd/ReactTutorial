
import './App.css';
import styles from 'styled-components'
import { useState, useEffect } from 'react';

const Person = styles.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    width: 300px;   
`
const Formulario = styles.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border: 1px solid black;
    width: fit-content;
`
function App() {
  const [url, seturl] = useState("http://localhost:3000/Pessoas")
  const [pessoas, setPessoas] = useState([])
  const [Nome, setnome] = useState("")
  const [Idade,setidade] = useState(0)

  useEffect(() => {
    const getPeople = async () => {
      const res = await fetch(url)

      const data = await res.json()

      setPessoas(data)
    }
    getPeople()
  }, [pessoas])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const Pessoas = {
      Nome,
      Idade
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Pessoas)

    })

  }

  return (
    <div className="App">
        <h1>Lista de Pessoas</h1>
        {
          pessoas.map((value) => (
            <Person key={value.id}>
              <ul >
                <li>ID: {value.id}</li>
                <li>Nome: {value.Nome}</li>
                <li>Idade: {value.Idade}</li>
              </ul>
            </Person>
          ))
        }
        <Formulario onSubmit={handleSubmit}>
          <h3>Adicionar pessoas:</h3>
          <label>
              <span>Nome:</span>
              <input type="text" value={Nome} name="Nome" onChange={(e) => setnome(e.target.value)}/>
          </label>
          <label>
              <span>Idade:</span>
              <input type="number" value={Idade} name="Idade" onChange={(e) => setidade(e.target.value)}/>
          </label>

          <button type="submit">Adicionar pessoa!</button>
        </Formulario>
    </div>
  );
}

export default App;
