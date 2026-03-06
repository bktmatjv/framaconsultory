exports.handler = async function(event, context) {
    // 1. Imprimimos apenas llega CUALQUIER cosa a la URL
    console.log("🔔 ¡NUEVA PETICIÓN RECIBIDA!");
    console.log("Método utilizado:", event.httpMethod);

    if (event.httpMethod !== "POST") {
        console.log("🛑 Petición bloqueada: Fue un GET (seguramente entraste desde el navegador).");
        return { statusCode: 405, body: "Método no permitido" };
    }

    try {
        // 2. Imprimimos el paquete exacto y crudo que manda ElevenLabs
        console.log("📦 Datos crudos enviados por ElevenLabs:", event.body);
        
        const parametros = JSON.parse(event.body);
        
        const nombre = parametros.nombre_cliente || "No especificado";
        const interes = parametros.interes_principal || "No especificado";
        const telefono = parametros.numero_telefono || "No especificado";
        const correo = parametros.correo || "No especificado";

        // 3. Imprimimos los datos ya limpios
        console.log("✅ DATOS EXTRAÍDOS CORRECTAMENTE:");
        console.log(`Nombre: ${nombre}`);
        console.log(`Teléfono: ${telefono}`);
        console.log(`Correo: ${correo}`);
        console.log(`Interés: ${interes}`);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                estado: "Exito",
                instruccion_al_agente: "Datos guardados. Dile al usuario que su información fue registrada exitosamente."
            })
        };

    } catch (error) {
        console.error("❌ ERROR AL PROCESAR:", error);
        return { statusCode: 500, body: "Error interno del servidor" };
    }
};