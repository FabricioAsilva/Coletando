function popularUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(estados => {
        for(const estado of estados){
            ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
        }
    })
}

popularUFs()

function getCidades(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const setEstado = event.target.selectedIndex
    stateInput.value = event.target.options[setEstado].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<ption value> Selecione a Cidade</ption>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cidades => {
        
        for(const cidade of cidades){
            citySelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCidades)

//codigos da grid itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //retornará um verdadeiro ou falso
        return itemFound
    })

    if( alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId 
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}