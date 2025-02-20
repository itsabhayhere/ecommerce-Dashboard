import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const UpdateProduct = ()=>{

    const [name, setName] = React.useState("");
    const [price , setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company , setCompany] = React.useState("");
    const params = useParams();
    const Navigate = useNavigate();
    
    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async ()=>{
        let result = await fetch(`http://localhost:4500/product/${params.id}`);
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    const updateProduct = async ()=>{
        let result = await fetch(`http://localhost:4500/product/${params.id}`, {
            method: 'put',
            body : JSON.stringify({name,price,company,category}),
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        result = await result.json();
        if(result){
            Navigate('/')
        }
    }
    return(
        <div className='product'>
        <h1>UpdateProduct</h1>
        <input 
            className='inputBox' 
            type='text' 
            placeholder='Enter Product Name' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
        />
        <input 
            className='inputBox' 
            type='text' 
            placeholder='Enter Product Price' 
            value={price}
            onChange={(e) => setPrice(e.target.value)} 
        />
        <input 
            className='inputBox' 
            type='text' 
            placeholder='Enter Product Category' 
            value={category}
            onChange={(e) => setCategory(e.target.value)} 
        />
        <input 
            className='inputBox' 
            type='text' 
            placeholder='Enter Product Company' 
            value={company}
            onChange={(e) => setCompany(e.target.value)} 
        />
        <button type='button' onClick={updateProduct}>Update</button>
    </div>
    )
}

export default UpdateProduct;