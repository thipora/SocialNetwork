class Post{
    static nextId=findId()
    constructor(userId,title,body){
        this.userId=userId
        this.id=nextId++
        this.title=title
        this.body=body
    }

    
}
function findId() {
    let todos=[];
    fetch(`http://localhost:8080/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        })
    .then(response => response.json())
    .catch(()=>{console.log("error")})
    .then(data=>todos=data)
    return todos.reduce((maxTodo, currentTodo) => {
        return currentTodo.id > maxTodo.id ? currentTodo : maxTodo;
    }, todos[0])
    ; 
    
}