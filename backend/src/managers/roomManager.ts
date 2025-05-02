interface Room{
    uid1:number,
    uid2:number
}

export class RoomManager {

    private rooms : Map<string,Room>
    constructor(){
        this.rooms = new Map();
    }

    newRoom(roomName:string,room:Room){
        this.rooms.set(roomName,room);
    }
}