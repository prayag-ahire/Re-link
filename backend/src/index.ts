import express from "express";
import cors from "cors"
import http from "http"
import {Server} from "socket.io"
import bcrypt from "bcryptjs"
import jwt,{JwtPayload} from "jsonwebtoken" 
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
const server = http.createServer(app);
// const io = new Server(server);

const prismaClient = new PrismaClient();



app.post("/login",async(req,res):Promise<any>=>{

    const {username,password} = req.body;
    try{
        const user = await prismaClient.user.findFirst({
            where:{
                name:username
            }
        })
        if(!user){
            return res.status(400).json({"message":"Invalid credintials ! user not exist"})
        }

        const match = await bcrypt.compare(password,user.password);
        if(!match){
            res.status(400).json({"message":"Invalid credintials !"})
        }

        const token = jwt.sign({id:user?.id},"chat-app");
        res.json({token:token})


    }catch(error){
        res.status(500).json({"message":"user not exist please signup first :)"})
    }

    
})

app.post("/signup",async (req,res):Promise<any>=>{

    const {username,password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    try{
        const user = await prismaClient.user.findFirst({
            where:{
                name:username
            }
        })
        if(user){
            return res.status(400).json({"message":"user exitst please choose diffrent username"});
        }else{
            const user = await prismaClient.user.create({
                data:{
                    name:username,
                    password:hash
                },
                select:{
                    id:true
                }
            })

            const token = jwt.sign({id:user.id},"chat-app");
            res.json({token:token});
        }
    }catch(error){
        console.error(error);
        res.status(500).send('server error');
    }
})

app.post("/user",async(req,res)=>{
    const token = req.body;
    console.log(token);
    const tk = token.token+"";
    const id = jwt.verify(tk,"chat-app");
    const uid = (id as JwtPayload).id
      
    try{
        const user = await prismaClient.user.findFirst({
            where:{
                id:uid
            },
            select:{
                name:true
            }
        })
        console.log(user);
        res.json({user})
    }catch(error){
        console.error(error);
        res.status(500).send('server error');
    }

})

app.post("/userupdate",async(req,res)=>{
    const {token,username} = req.body;
    console.log(token);
    const tk = token+"";
    const id = jwt.verify(tk,"chat-app");
    const uid = (id as JwtPayload).id

    try{
        const user = await prismaClient.user.update({
            where:{
                id:uid
            },
            data:{
                name:username
            }
        })

    }catch(error){
        console.error(error);
        res.status(500).send('server error');
    }
})

app.post("/friendlist",async(req,res)=>{
    const token = req.body;
    console.log(token);
    const tk = token.token+"";
    const id = jwt.verify(tk,"chat-app");
    const uid = (id as JwtPayload).id
    try{
        const user = await prismaClient.user.findFirst({
            where:{
                id:uid
            },select:{
                friends:{
                    select:{
                        name:true
                    }
                }
            }
        }) 
        res.json({user});
    }catch(error){
        console.error(error);
        res.status(500).send('server error');
    }
})

app.post("/addfriend",async(req,res)=>{
    const {token,fid} = req.body;
    console.log(token);
    const tk = token+"";
    const id = jwt.verify(tk,"chat-app");
    const uid = (id as JwtPayload).id

    try{
        const user1 = await prismaClient.user.update({
            where:{
                id:uid
            },
            data:{
                friends:{
                    connect:{id:Number(fid)}
                }
            }
        })

        const user2 = await prismaClient.user.update({
            where:{
                id:Number(fid)
            },
            data:{
                friends:{
                    connect:{id:uid}
                }
            }
        })
        res.json({user1,user2})
    }catch(error){
        console.error(error);
        res.status(500).send('server error');
    }
})


server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})