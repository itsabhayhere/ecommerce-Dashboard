const express = require("express");
require('./db/config')

const users = require('./db/users');
const Product = require('./db/products');
const cors = require('cors');

const products = require("./db/products");
const app = express();

const Jwt = require('jsonwebtoken');
const jwtKey = 'E-commerce'

app.use(express.json());
app.use(cors());

app.post('/register', async (req ,resp)=>{
    let user = new users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey, {expiresIn:"2h"} , (err,token)=>{
        if(err){
            resp({result:"something went wrong"})
        }
        resp.send({result , auth:token})
    })
})
app.post('/login', async(req ,resp)=>{
    if(req.body.email && req.body.password){
        let data = await users.findOne(req.body).select("-password");
        if(data){
            Jwt.sign({data},jwtKey,{expiresIn:"2h"}, (err,token)=>{
                if(err){
                    resp.send({result: "Something went wrong"});
                }
                resp.send({data,auth:token});
            })
            
        }
    }else{
        resp.send({result:'No user found'});
    }
})
app.post('/add-product', async(req,resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})
app.get('/products' , async(req,resp)=>{
    let products = await Product.find();
    if(products.length>0) {
        resp.send(products)
    }else{
        resp.send({result:"No data found"});
    }
})
app.delete('/product/:id',async (req,resp)=>{
    let result = await products.deleteOne({_id:req.params.id})
    resp.send(result);      
})
app.get('/product/:id' , async(req ,resp)=>{
    let result = await products.findOne({_id:req.params.id})
    if(result){ 
        resp.send(result)
    }else{
        resp.send({result:"no result found"})
    }
})

app.put('/product/:id' , async (req,resp)=>{
    let result = await products.updateOne(
        {_id:req.params.id},
        {
            $set : req.body
        }
    )
    resp.send(result)
})

//search api
app.get('/search/:key', async(req ,resp)=>{
    let result = await products.find({
        "$or" :[
            {name : {$regex : req.params.key}},
            {company : {$regex : req.params.key}},
            {category : {$regex : req.params.key}}
        ]
    })
    resp.send(result)
})

app.listen(4500);