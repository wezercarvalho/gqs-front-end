import { size, set } from 'lodash'
import sendToApi from '../services/index'

// Inicializa uma referência vazia
let registeredList = []

/**
 * Obtém os registros
 * @returns
 */
function getRegisteredInfo() {
    return registeredList
}

/**
 * Seta um novo registro
 * @param {object} info Informações para salvar
 */
function setRegisteredInfo(info) {
    const id = size(registeredList) + 1

    // Adiciona o id no objeto
    set(info, 'id', id)

    registeredList = [
        ...registeredList,
        info
    ]

    // Simula o disparo da requisição para um endpoint no back-end
    sendToApi(JSON.stringify(info))
}

// Agrupa as funções criadas
const store = {
    getRegisteredInfo,
    setRegisteredInfo
}

// Exporta um objeto contendo as funções criadas
export default store