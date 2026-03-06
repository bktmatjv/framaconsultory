exports.handler = async function(event, context) {
    // 1. ElevenLabs enviará una petición POST, bloqueamos cualquier otro método
    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: "Método no permitido" }) 
        };
    }

    try {
        // 2. Convertimos el texto que envía ElevenLabs a un objeto JSON
        const data = JSON.parse(event.body);
        
        // 3. Extraemos los datos (Asegúrate de que los nombres coincidan con los que configuraste en ElevenLabs)
        // Nota: La estructura exacta del JSON depende de si usas Tool o Post-call Webhook
        const datosCliente = data.data_collection || data; 
        
        const nombre = datosCliente.nombre || "Sin nombre";
        const telefono = datosCliente.telefono || "Sin teléfono";
        const interes = datosCliente.interes || "Sin interés especificado";

        // Aquí puedes ver los datos en los logs de Netlify
        console.log(`¡Nuevo cliente recibido! Nombre: ${nombre}, Teléfono: ${telefono}, Interés: ${interes}`);

        // TODO: Aquí iría el código para guardar en tu base de datos o enviar un email

        // 4. Respondemos a ElevenLabs para que sepa que recibimos los datos correctamente
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                status: "success", 
                message: "Datos guardados exitosamente" 
            })
        };

    } catch (error) {
        console.error("Error procesando el webhook:", error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "Error interno del servidor" }) 
        };
    }
};