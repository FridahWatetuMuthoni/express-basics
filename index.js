const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

const users = [
    {
        id:1,
        username:"fridah",
        email:"fridah@gmail.com"
    },
    {
        id:2,
        username:"jackson",
        email:"jackson@gmail.com"
    },
    {
        id:3,
        username:"rowan",
        email:"rowan@gmail.com"
    },
]

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.get('/api/users',(req,res)=>{
    res.send(users)
})

app.get('/api/users/:id',(req,res)=>{
    const parsed_id = parseInt(req.params.id)

    if(isNaN(parsed_id)){
        return res.status(400).send({msg:"Bad Request. Invalid id"})
    }
    else{
        const user = users.find((user)=> user.id === parsed_id)
        if(user){
            res.send(user)
        }
        else{
            res.send(`user with id of ${req.params.id} not found`)
        }
    }
})

// 404 ERROR
app.use((req,res,next)=>{
    res.status(404)
    res.send('Oops sorry, page not found')
})

// 500 ERROR
app.use((req,res,next)=>{
    res.status(500)
    res.send('Server Error')
})

app.listen(PORT,()=>{
    console.log(`server is running on: http://localhost:3000`)
})