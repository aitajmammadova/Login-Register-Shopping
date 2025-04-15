import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import React from "react"
function ProductForm() {
   const [product,setProduct]=useState({
    name:"",
    price:"",
    description: "",
   })
   const handleChange = (e)=>{
    setProduct({...product,[e.target.name]: e.target.value})
   }
   const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
        const response = await fetch("http://127.0.0.1:8000/products/add_product",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(product),
        });
        if (response.ok){
            alert("New product added.")
            setProduct({name:"",price:"",description:""})
        }else{
            alert("Error catched.")
        }
    }catch{
        console.error("Eror",error)
    }
   }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name
                <input type="text" name="name" required value={product.name} onChange={handleChange}></input>
            </label>
            <br/>
            <label>Price
                <input type="number" name="price" required value={product.price} onChange={handleChange}></input>
            </label>
            <br />
            <label>Description
                <textarea name="description" required value={product.description} onChange={handleChange}></textarea>
            </label>
            <br />
            <button type="submit">Add product.</button>


        </form>
    )
}

export default ProductForm