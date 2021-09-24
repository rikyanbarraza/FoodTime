async function collectText() {
    const textToDisplay = await makeRequest("http://localhost:3000/api", "GET")
    const header = document.getElementsByTagName("h1")[0]
    header.innerText = textToDisplay
}

async function saveNew() {
    const status = await makeRequest("http://localhost:3000/api", "POST", {brand: "audi", model: "A3", price: "670 000"})
    console.log(status)
}

async function makeRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            headers: {"Content-Type": "application/json"},
            method,
            body: JSON.stringify(body)
        })
        console.log(response)
        const result = await response.json()
        
        return result

    } catch(err) {
        console.error(err)
    }
}