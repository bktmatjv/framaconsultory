exports.handler = async function(event, context) {
    // 1. Bloqueo de seguridad (Solo permitimos POST de ElevenLabs)
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Método no permitido" };
    }

    try {
        // 2. Extraemos los datos que envía la IA
        const parametros = JSON.parse(event.body);
        
        const nombre = parametros.nombre_cliente || "No especificado";
        const interes = parametros.interes_principal || "No especificado";
        const telefono = parametros.numero_telefono || "No especificado";
        const correoCliente = parametros.correo || "No especificado";

        console.log(`🤖 IA capturó a: ${nombre} - ${telefono}`);

        // ==========================================
        // CONFIGURACIÓN DE RESEND (¡Revisa esto!)
        // ==========================================
        const API_KEY = "re_XjuHu41F_KhpXmJP5ueBWPTKyTrGcsf9v"; // Tu clave que empieza con re_...
        const MI_CORREO_PERSONAL = "contacto.framaconsulting@gmail.com"; // Tu correo registrado en Resend
        
        // 3. Enviamos la orden a Resend
        console.log("⏳ Enviando petición a Resend...");
        
        const respuestaResend = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                from: 'onboarding@resend.dev', // ¡NO CAMBIES ESTO!
                to: MI_CORREO_PERSONAL, // Solo llegará si es tu correo registrado
                subject: `🔥 Nuevo Lead: ${nombre}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="color: #2c3e50;">¡Nuevo cliente para Creando Detalles MMP!</h2>
                        <p>El agente de Inteligencia Artificial acaba de capturar estos datos:</p>
                        <ul style="font-size: 16px;">
                            <li><strong>Nombre:</strong> ${nombre}</li>
                            <li><strong>Teléfono:</strong> ${telefono}</li>
                            <li><strong>Correo:</strong> ${correoCliente}</li>
                            <li><strong>Interés:</strong> ${interes}</li>
                        </ul>
                        <p style="color: #7f8c8d; font-size: 12px;">Generado automáticamente vía ElevenLabs & Netlify</p>
                    </div>
                `
            })
        });

        // 4. EL CHIVATO: Leemos qué nos respondió Resend
        const datosRespuesta = await respuestaResend.json();
        console.log("📬 Respuesta oficial de Resend:", JSON.stringify(datosRespuesta));

        // 5. Le respondemos a la IA para que continúe hablando
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                estado: "Exito",
                instruccion_al_agente: `Confirmado. Dile a ${nombre} que ya registraste sus datos y que el equipo lo contactará muy pronto.`
            })
        };

    } catch (error) {
        console.error("❌ Error en el código:", error);
        return { statusCode: 500, body: "Error interno" };
    }
};