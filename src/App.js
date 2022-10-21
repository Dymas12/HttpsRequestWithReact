
import './App.css';
import { useState , useEffect } from 'react';

function App() {
  const [products , setProducts] = useState([]);
  const [name,setName] = useState("");
  const [price , setPrice] = useState("");

  const url  = "http://localhost:3000/products"

  useEffect(()=>{
    async function fetchMyApi(){
      const res = await fetch(url);

      const data = await res.json()
  
      setProducts(data)
    }
    fetchMyApi()
  },[]);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const product = {
      name,
      price,
    };

    const res = await fetch(url,{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(product),
    });
  }

  return (
    <div className="App">
    <h1> Lista de Produtos</h1>
    <ul>
      {products.map((product)=>(
        <li key={product.id}>{product.name} - R$:{product.price}</li>
      ))}
    </ul>
    <div className="add-product">
      <form onSubmit={handleSubmit}>

        <label>
          Nome:
          <input type="text" value={name} name="name" onChange={(e)=> setName(e.target.value)} />
        </label>
        <label>Preço:
          <input type="text" value={price} price="price" onChange={(e) => setPrice(e.target.value)} />
        </label>
        <input type="submit"  value="Criar"/>
      </form>
    </div>
    </div>
  );
}

export default App;
