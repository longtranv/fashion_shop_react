import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import Product from "./Product"

const Container = styled.div`
   padding: 20px;
   display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Products = ({cat, filters, sort}) => {
  const [products, setProducts]= useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  useEffect(()=>{
    const getProducts = async ()=>{
      try{
        const res = await axios.get(cat?`https://mernappapi.onrender.com/v1/product?category=${cat}`:"https://mernappapi.onrender.com/v1/product");
        setProducts(res.data);
      }catch(err){

      }
    }
    getProducts()
  },[])
  
  useEffect(()=>{
    setProducts((prev)=>
        [...prev].sort((a,b)=>a.createdAt-b.createdAt));
  }, [products])

  useEffect(()=>{
      products && setFilteredProducts(
      products.filter(item=>Object.entries(filters).every(([key, value])=> item[key].includes(value)))

    );
  },[filters])

  useEffect(()=>{
      if(sort==="newest"){
        setFilteredProducts((prev)=>
          [...prev].sort((a,b)=>a.createdAt-b.createdAt)
        );
      }else if(sort==="asc"){
        setFilteredProducts((prev)=>
          [...prev].sort((a,b)=>a.price-b.price)
        );
      } else {
        setFilteredProducts((prev)=>
          [...prev].sort((a,b)=>b.price-a.price)
        );
      }
    },[sort]
  );
  return (
    <Container>
        {/* { cat 
            ? filteredProducts.map((item)=>(<Product item={item} key={item.id}/>)) 
            : filteredProducts
              .slice(0, 8)
              .map((item)=>(<Product item={item} key={item.id}/>))} */}
              {(!filters && sort ==="newest") ? products
              .slice(0, 8)
              .map((item)=>(<Product item={item} key={item.id}/>))
              : filteredProducts.map((item)=>(<Product item={item} key={item.id}/>))}
    </Container>
  )
}

export default Products