const form = document.getElementById('form-itens')
const input = document.getElementById('receber-item')
const listaNaoComprados = document.getElementById('lista-de-itens')
const listaComprados = document.getElementById('itens-comprados')
const itensLocalStorage = localStorage.getItem('listaItens')

let listaItens = []
let indexEdita

function atualizaLocalStorage(){
    localStorage.setItem("listaItens", JSON.stringify(listaItens))
}

if(itensLocalStorage){
    listaItens = JSON.parse(itensLocalStorage)
    mostraItem()
}else{
    listaItens = []
}

form.addEventListener('submit', (evento) => {
    evento.preventDefault()
    guardaItem()
    mostraItem()
})

function guardaItem(){
    const inputValor = input.value
    
    const existe = listaItens.find(elemento => elemento.item.toUpperCase() === inputValor.toUpperCase())

    if(existe){
        alert('Esse item já foi adicionado!!')
    }else{
        listaItens.push({
            item:inputValor,
            checar: false
        })
    }
}

function mostraItem(){
    
    listaNaoComprados.innerHTML = ''
    listaComprados.innerHTML = ''

    listaItens.forEach((elemento,index) => {
        
        if(elemento.checar){
            listaComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" checked class="is-clickable" />  
                    <span class="itens-comprados is-size-5">${elemento.item}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>`
        }else{
            listaNaoComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${elemento.item}"${index != indexEdita ? 'disabled': ''}></input>
                </div>
                <div>
                ${index == indexEdita ? '<button onclick="salvaItem()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>':'<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>`
        }    
    })

    const checkbox = document.querySelectorAll('input[type="checkbox"]')
    
    checkbox.forEach(elemento => {
        elemento.addEventListener('click', (evento) => {
            const indexElemento = evento.target.parentNode.parentNode.getAttribute('data-value')
            listaItens[indexElemento].checar = evento.target.checked
            mostraItem()
        })
    })

    const deleta = document.querySelectorAll('.deletar')

    deleta.forEach(elemento => {
        elemento.addEventListener('click', (evento) => {
            const indexElemento = evento.target.parentNode.parentNode.getAttribute('data-value')
            listaItens.splice(indexElemento, 1)
            mostraItem()
        })
    })

    const indexAeditar = document.querySelectorAll(".editar")
    
    indexAeditar.forEach(elemento => {
        elemento.addEventListener('click', (evento) => {
            indexEdita = evento.target.parentNode.parentNode.getAttribute('data-value')
            mostraItem()
        })
    })
   
    atualizaLocalStorage()
}

function salvaItem(){
    const itemEditado = document.querySelector(`[data-value="${indexEdita}"] input[type="text"]`)
    listaItens[indexEdita].item = itemEditado.value
    indexEdita = - 1
    mostraItem()
}

