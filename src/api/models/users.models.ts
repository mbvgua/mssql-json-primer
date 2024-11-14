
export interface User {
    username:string,
    profile:{
        bodyMass:{
            height:number,
            weight:number
        },
        age:number,
        gender:string,
        weapons:Array<string>
    },
    parameters:{
        physicalStrength:number,
        emotionalStrength:number,
        sociability:number,
        intelligence:number,
        stamina:number,
        legerity:number
    }
}