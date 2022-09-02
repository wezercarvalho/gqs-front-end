/* Implementação para exemplificação - Bônus */

/**
 * Simula o disparo de uma requisição para um endpoint
 * @param {object} data 
 */
export default function sendToApi(data) {
    fetch('https://gentequesoma.free.beeceptor.com',
        {
            method: "POST",
            body: data,
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .catch(err => console.log(err))
}
