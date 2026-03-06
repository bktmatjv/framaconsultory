exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Método no permitido" };
    }

    try {
        const parametros = JSON.parse(event.body);
        
        const nombre = parametros.nombre_cliente || "No especificado";
        const interes = parametros.interes_principal || "No especificado";
        const telefono = parametros.numero_telefono || "No especificado";
        const correo = parametros.correo || "No especificado";

        console.log(`Procesando cliente: ${nombre} - ${telefono}`);

        // --- ENVIAR CORREO CON FETCH Y RESEND ---
        // Usamos la API gratuita de Resend que no requiere instalar paquetes
        
        const API_KEY_RESEND = "AQUI_PONDREMOS_TU_CLAVE"; // Pronto la cambiaremos

        const respuestaCorreo = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY_RESEND}`
            },
            body: JSON.stringify({
                from: 'onboarding@resend.dev', // Resend usa este correo por defecto para pruebas
                to: 'TU_CORREO_REAL@gmail.com', // Pon aquí el correo donde quieres recibir las alertas
                subject: `🔥 Nuevo cliente del Agente AI: ${nombre}`,
                html: `
                    <h2>¡Tienes un nuevo prospecto interesado!</h2>
                    <ul>
                        <li><strong>Nombre:</strong> ${nombre}</li>
                        <li><strong>Teléfono:</strong> ${telefono}</li>
                        <li><strong>Correo:</strong> ${correo}</li>
                        <li><strong>Interés:</strong> ${interes}</li>
                    </ul>
                    <p>Comunícate pronto para cerrar el trato.</p>
                `
            })
        });

        if (!respuestaCorreo.ok) {
            console.error("Error al enviar el correo:", await respuestaCorreo.text());
        } else {
            console.log("✅ ¡Correo enviado exitosamente!");
        }
        // --- FIN DEL ENVÍO DE CORREO ---

        // Le respondemos a ElevenLabs para que el agente siga hablando
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                estado: "Exito",
                instruccion_al_agente: `Has guardado los datos con éxito. Dile a ${nombre} que su solicitud fue registrada y pronto lo contactarán.`
            })
        };

    } catch (error) {
        console.error("❌ Error interno:", error);
        return { statusCode: 500, body: "Error al procesar" };
    }
};