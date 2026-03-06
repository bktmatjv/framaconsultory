exports.handler = async function(event, context) {
    // 1. Bloqueamos cualquier petición que no sea POST (ElevenLabs siempre usa POST)
    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: "Método no permitido" }) 
        };
    }

    try {
        // 2. Convertimos la información que envía ElevenLabs a JSON
        const data = JSON.parse(event.body);
        
        // ElevenLabs a veces envuelve la info en distintos objetos dependiendo de si es Webhook o Tool.
        // Hacemos que busque la información donde sea que venga:
        const datosExtraidos = data.data_collection_results || data.analysis || data; 
        
        // 3. Extraemos TUS variables exactas (los nombres deben coincidir con tu imagen)
        const nombre = datosExtraidos.nombre_cliente || "No especificado";
        const interes = datosExtraidos.interes_principal || "No especificado";
        const telefono = datosExtraidos.numero_telefono || "No especificado";
        const correo = datosExtraidos.correo || "No especificado";

        // 4. Imprimimos en la consola de Netlify para confirmar que llegaron bien
        console.log("====================================");
        console.log("¡NUEVO CLIENTE RECIBIDO DESDE LA IA!");
        console.log(`Nombre: ${nombre}`);
        console.log(`Interés: ${interes}`);
        console.log(`Teléfono: ${telefono}`);
        console.log(`Correo: ${correo}`);
        console.log("====================================");

        // (Aquí a futuro pondremos el código para guardarlo en tu base de datos)

        // 5. Le respondemos a ElevenLabs que todo salió bien (Status 200)
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                status: "success", 
                message: "Datos de contacto capturados correctamente" 
            })
        };

    } catch (error) {
        console.error("Error procesando el webhook:", error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "Error interno del servidor al procesar datos" }) 
        };
    }
};