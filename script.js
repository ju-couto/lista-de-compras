let lista = document.getElementById('list-items');
let inputItem = document.getElementById('text-item');
let btn= document.getElementById('btn-add')
let btnDelAll = document.getElementById('btn-delAll')
let arr = []

function createItem(item){
    return{
        id: arr.length,
        item,
        btnDel: document.createElement("button"),
        btnEdit: document.createElement("button")
    }
}
async function add(){
    if(inputItem.value){
        let user= await pullAPI()
        if(user){
            let item = document.createElement('li')
            item.setAttribute('class',"list-group-item d-flex gap-3 lh-md align-center text-break")
            lista.appendChild(item)
            let itemTxt = inputItem.value
            arr.push(createItem(itemTxt))
            let i = arr.length - 1
            arr[i].name= user.name.first
            arr[i].email= user.email
            item.id = i
            item.appendChild(arr[i].btnDel)
            arr[i].btnDel.setAttribute("class","btn  btn-danger btn-sm badge")
            arr[i].btnDel.addEventListener('click', del)
            item.appendChild(arr[i].btnEdit)
            arr[i].btnEdit.setAttribute("class"," btn btn-success btn-sm badge")
            arr[i].btnEdit.innerHTML = "edit"
            arr[i].btnEdit.addEventListener('click', edit)
            arr[i].btnDel.innerHTML ="X"
            item.append(arr[i].item + " - "+arr[i].name+' '+arr[i].email) 
            inputItem.value = ""
        }else{
            console.log("Erro")
        }    
    }else{
        alert("Por favor insira um valor válido!")
        inputItem.focus()
    }
}
function del(){
    let item = this.parentNode
    arr.pop(arr.find(e => e.id == item.id))
    item.parentNode.removeChild(item)
}
function delAll(){
    arr=[]
    lista.innerHTML=""
}
function edit(){
    let item = this.parentNode
    inputItem.value = arr[item.id].item
    item.setAttribute("edited",true)
    btn.value = "save"
    btn.setAttribute("class","btn-sm  btn-success  mx-0 ")
    btn.removeEventListener('click',add)
    btn.addEventListener('click',save)
    inputItem.focus()
}
function save(){
    if(inputItem.value){
        let item= document.querySelector('[edited=true]')
        let i=item.id
        arr[i].item = inputItem.value
        item.removeAttribute('edited')
        item.lastChild.textContent = arr[i].item +" - "+ arr[i].name + " "+ arr[i].email
        btn.setAttribute("class","btn-sm  btn-primary  mx-0 ")
        btn.value="add"
        btn.removeEventListener('click',save)
        btn.addEventListener('click',add)
        inputItem.value= ""
    } else{
        alert("Insira um valor válido")
        inputItem.focus()
    }
}

async function pullAPI(){
   try{ 
    const users = await fetch('https://randomuser.me/api/')
    const usersJson = await users.json()
    return usersJson.results[0]
   } catch(e){
       alert("Erro! Entre em contato com o suporte!")

   }
}

function pressEnter(e){
    if(e.key==='Enter'){
        if(btn.value =="add"){
            add()
        }else if(btn.value=="save"){
            save()
        }
    }
}

btnDelAll.addEventListener('click',delAll)
btn.addEventListener('click',add)
inputItem.addEventListener('keypress',pressEnter)