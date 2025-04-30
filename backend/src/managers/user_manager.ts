import {Socket} from "socket.io"

export interface User{
    name: string,
    id: string,
    ws:Socket
}  


export class userManager{


    constructor(){
     
    }

    addUser(){

    }

    removeUser(){

    }

    async addFriend(userId:number){

    }

    async removeFriend(userId:number){

    }

    async getFriends(userId:number){

    }

}