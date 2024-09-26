const enviarDatos = async (data) => {
    try {
        const response = await fetch('https://f7b68k2bu5.execute-api.us-east-1.amazonaws.com/Stage1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        return result
    } catch (error) {
        console.error('Error al llamar a la API:', error)
        return { error: error.message }
    }
}

export default enviarDatos;

