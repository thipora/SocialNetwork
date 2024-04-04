export default class TodoObject{
    
  
    constructor(userId,id, title,completed=false){
        this.id=id
        this.userId=userId
        this.title=title
        this.completed=completed
    }
  

}

