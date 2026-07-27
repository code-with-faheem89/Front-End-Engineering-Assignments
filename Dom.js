// const p=document.getElementById("text");
// console.log(p);
// const pclass=document.getElementsByClassName("text");
// console.log(pclass); //returns a html collection
// const pclass1=document.getElementsByClassName("text")[0];//returns first element
// console.log(pclass1);

// const pq=document.querySelector(".text");
// console.log(pq);

// const qall=document.querySelectorAll(".text");
// console.log(qall);//returns a node list

// const create=document.querySelector(".create");
// const createinput=document.createElement("input");
// create.append(createinput); // append adds at last;;prepend adds at first
// create.classList="divelement";


// p.style.color="red";
// p.remove();

// const todocontainer=document.getElementById("todo");
// const inputtask=document.createElement("input");
// inputtask.type="text";
// inputtask.placeholder="Enter task..";
// const btn=document.createElement("button");
// btn.textContent="Add";
// console.log(todocontainer);
// todocontainer.append(inputtask);
// todocontainer.append(inputtask,btn);
// // const task=inputtask.value.trim();
// btn.addEventListener("click",addtodo);


(function(){
    const todos=[];
    const todocontainer=document.getElementById("todo");

    const todoinput=document.createElement("input");
    todoinput.type="text";
    todoinput.placeholder="Enter task...";

    const addbtn=document.createElement("button");
    addbtn.textContent="ADD";
    const todolist=document.createElement("div");
    todolist.style.border="3px solid pink";
    todolist.style.margin="20px";
    todocontainer.append(todoinput,addbtn,todolist);

    function rendertask(task){
        const todoitem=document.createElement("div");
        todoitem.style.border="2px solid blue";
        todoitem.style.margin="20px";
        const p=document.createElement("p");
        p.textContent=task;
        const deletebtn=document.createElement("button");
        deletebtn.textContent="Delete";
        const editbtn=document.createElement("button");
        editbtn.textContent="Edit";
        editbtn.addEventListener("click",function(){
            const editinput=document.createElement("input");
            editinput.value=task;
            const savebtn=document.createElement("button");
            const completebtn=document.createElement("button");
            completebtn.textContent="Completed";
            completebtn.addEventListener("click",function(){
                todoitem.style.backgroundColor="green";
                completebtn.remove();
            })
            savebtn.textContent="Save";
            todoitem.prepend(editinput,savebtn,completebtn);
            editinput.focus();
            savebtn.addEventListener("click",function(){
                const updatedtask=editinput.value;
                if(!updatedtask){
                    return;
                }
                p.textContent=updatedtask;
                const index=todos.indexOf(task);
                todos[index]=updatedtask;
                editbtn.remove();
                savebtn.remove();
                todoitem.style.backgroundColor="White";
                console.log(todos);
            })
        })
        deletebtn.addEventListener("click",function(){
            const index=todos.indexOf(task);
            todos.splice(index,1);
            todoitem.remove();
        })
        todoitem.append(p,deletebtn,editbtn);
        todolist.prepend(todoitem);
    }

    function addtodo(){
        const task=todoinput.value;
        // console.log(task);
        if(!task) return;
        todos.unshift(task);//add task in array todos
        console.log(todos);
        rendertask(task);
        todoinput.value="";//once we have entered the input after that it becomes empty automatically
        todoinput.focus();//we dont have to click the input task box again and again to enter the input
    }
    addbtn.addEventListener("click",addtodo);
    todoinput.addEventListener("keydown",function(e){
        console.log(e);
        if(e.key=="Enter"){
            addtodo();
        }
    });
})();

let id=Number(localStrorage.getItem("id"))||0;
function addtodo(){
    const task=todoinput.value;
    if(!task){
        return;
    }
    id=id+1;
    const obj={
        id:id,
        text:task,
        complete:false,
        edit:0
    }
    todos.unshift(obj);
    localStorage.setItem("todos",JSON.stringify(todos));
    localStorage.setItem("id",id);// so that id variable never reset , the value of id will be updated id only.
}
