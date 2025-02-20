import React, {useState , useEffect} from "react";
import { Link } from "react-router-dom";

const ProductList = ()=>{

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])
    const getProducts = async ()=>{
        let result = await fetch('http://localhost:4500/products');
        result = await result.json();
        setProducts(result);
    }   

    const deleteProduct= async (id)=>{
        let result = await fetch(`http://localhost:4500/product/${id}`,{
            method : "Delete"
        })
        result = await result.json();
        if(result){
            getProducts();
        }
    }

    const productSearch = async (event)=>{
        let key = event.target.value;
        console.log(key)
        if(key){
            let result = await fetch(`http://localhost:4500/search/${key}`);
            result = await result.json();
            if(result) {
                setProducts(result);
            }
        }else{
            getProducts();
        }
        
    }
   
    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="text" className="search-boxs" onChange={productSearch} placeholder="search" />
            <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>

            {
               products.length>0 ? products.map((item,index)=>
                <ul key={item._id}>
                    <li>{index+1}</li>
                    <li>{item.name}</li>
                    <li>₹{item.price}</li>
                    <li>{item.category}</li>
                    <li> <button onClick={()=>deleteProduct(item._id)} className="delete">Delete</button>
                    <li className="update" > <Link  to={'/update/'+item._id}>Update</Link> </li>
                    </li>
                 </ul>
                )
                : <h1>No Result Found </h1>
            }
            
        </div>
        
    ) 
}

export default ProductList;