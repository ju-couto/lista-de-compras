let btn= document.getElementById('btn-add')
let inputItem = document.getElementById('text-item');
let lista = document.getElementById('list-items');
function add() {
    if (inputItem.value) {
        let item = document.createElement('li');
        item.setAttribute('class',"list-group-item d-flex gap-3")
        let btnDel = document.createElement('button');
        let btnEdit = document.createElement('button');
        btnDel.innerHTML = "X";
        btnDel.setAttribute("class","badge rounded-pill btn-danger")
        btnEdit.setAttribute("class","badge rounded-pill btn btn-success")
        btnEdit.innerHTML = "edit";
        let imageItem = document.createElement('img');
        item.innerHTML = inputItem.value /*+ imageItem;*/
        lista.append(item);
        item.append(btnDel);
        item.append(btnEdit);
        inputItem.value = ""
    } else {
        alert("Por favor insira um valor válido!")
    }
}
function del(){
this.parentElement.remove()
}
function edit(){
}
btn.addEventListener('click', add)
btnDel.addEventListener('click',del)