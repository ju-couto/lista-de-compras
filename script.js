let lista = document.getElementById('list-items');
let inputItem = document.getElementById('text-item');
let btn= document.getElementById('btn-add')
let btnDelAll = document.getElementById('btn-delAll')
let arr = []
function createItem(item,nome,email){
    return{
        id: arr.length,
        item,
        nome,
        email,
        btnDel: document.createElement("button"),
        btnEdit: document.createElement("button")
    }
}
function add(){
    if(inputItem.value){
        let item = document.createElement('li')
        item.setAttribute('class',"list-group-item d-flex gap-3 lh-md align-center text-break")
        lista.appendChild(item)
        let itemTxt = inputItem.value
        arr.push(createItem(itemTxt,'nome',"email"))
        let i = arr.length - 1
        item.id = i
        item.appendChild(arr[i].btnDel)
        arr[i].btnDel.setAttribute("class","badge rounded-pill btn-danger")
        arr[i].btnDel.addEventListener('click', del)
        item.appendChild(arr[i].btnEdit)
        arr[i].btnEdit.setAttribute("class","badge rounded-pill btn btn-success")
        arr[i].btnEdit.innerHTML = "edit"
        arr[i].btnEdit.addEventListener('click', edit)
        arr[i].btnDel.innerHTML ="X"
        let user= arr[i].nome + " " + arr[i].email
        item.append(arr[i].item + " "+user) 
        inputItem.value = ""
        
    }else{
        alert("Por favor insira um valor válido!")
        inputItem.focus()
    }
}
function del(){
    let item = this.parentNode
    arr.pop(arr.find(e => e.id == item.id))
    console.log(arr)
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
    let item= document.querySelector('[edited=true]')
    let i=item.id
    arr[i].item = inputItem.value
    let user= arr[i].nome + " "+ arr[i].email
    item.removeAttribute('edited')
    item.lastChild.textContent = arr[i].item +" "+user
    btn.setAttribute("class","btn-sm  btn-primary  mx-0 ")
    btn.value="add"
    btn.removeEventListener('click',save)
    btn.addEventListener('click',add)
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