
import './App.css';
import {useState,useEffect} from "react"

function App() {
  
  const [url, seturl] = useState("http://localhost:3000/products")
  const [products, setproducts] = useState([])

  // New Data

  const [name, setname] = useState("")
  const [price, setprice] = useState(0)


  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url) // Get a promise from fetch() with json server data
      const data = await response.json() // convert the data to a JS OBJECT

      setproducts(data) // Store the data in a state
    }

    getData()
    
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const products = {
      name,   //When the key has the same name as the state, we can just declare it once
      price,
    }

    const res = fetch(url, { // Second parameter needed when using a different method from "GET"
      method: "POST", // Method used
      headers: {
        "Content-Type": "application/json" // Content type 
      },
      body: JSON.stringify(products) // Convert JS OBJECT to JSON NOTATION
    })
  }
  return (
    <div className="App">
        <h2>Lista de produtos:</h2>

        <form onSubmit={handleSubmit}>
          <label>
              Name:
              <input 
                  type="text" 
                  value={name} 
                  name="name" 
                  onChange = {(e) => setname(e.target.value)}>
              </input>
          </label>
          <label>
              Price:
              <input 
                  type="number" 
                  value={price} 
                  name="price" 
                  onChange = {(e) => setprice(e.target.value)}>
              </input>
          </label>
          <button type="submit">Add product</button>
        </form>
          {/* {products.map((value) => {
            return(
              <section key={value.id}>
                <span> Name: {value.name}</span> <br/>
                <span> Price: {value.price}</span> <br/><br/>
              </section>
            )  */}

        
         
    </div>
  );
}

export default App;
