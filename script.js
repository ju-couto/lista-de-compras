


function add(){
    let inputItem = document.getElementById('text-item').value;
    let lista = document.getElementById('list-items');
    if(inputItem){
        let item = document.createElement('li')
        item.innerHTML = inputItem
        lista.append(item)
        //console.log(inputItem.value)
        
        
    } else{
        alert("Por favor insira um valor válido!")
    }
   
    
}