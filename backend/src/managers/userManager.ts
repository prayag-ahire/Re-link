import { Socket } from "socket.io";
import { User } from "./user";


export class userManager{

    private static instance : userManager
    private users : Map<number,User>

    constructor(){
       this.users = new Map();
    }

    // this is singletone class so only one instance 
    static getInstance(){
        if(!this.instance){
            this.instance = new userManager();
        }
        return this.instance
    }

    // create new user and store it in map
    createUser(id:number,socket:Socket){
        const user = new User(socket);
        this.users.set(id,user)
       
    }

    // give the user 
    private getUser(id:number){
        return this.users.get(id);
    }

    createRoom(Roomid:string,id1:number,id2:number){
        const user = this.getUser(id1);
        user?.createRoom(Roomid,id1,id2);

    }

    chat(Roomid:string,uid1:number,uid2:number,msg:string){
        const user = this.getUser(uid1);
        const room = user?.getRoom(Roomid);
        const s2 = this.getUser(uid2)?.socket;
        if(s2){
            room?.Chat(msg,s2,uid1,uid2);
        }
    }

} 