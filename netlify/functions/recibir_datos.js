const { Resend } = require('resend');

// Inicializamos Resend con tu API Key (reemplaza con tu clave real)
const resend = new Resend('re_9z8BHyr9_BzNVLjdTKY5A5pmJubax1Q6q'); 

exports.handler = async function(event, context) {
    // Bloqueo de seguridad para ElevenLabs
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Método no permitido" };
    }

    try {
        // Extraemos los datos que nos manda la IA
        const parametros = JSON.parse(event.body);
        const nombre = parametros.nombre_cliente || "No especificado";
        const interes = parametros.interes_principal || "No especificado";
        const telefono = parametros.numero_telefono || "No especificado";
        const correoCliente = parametros.correo || "No especificado";

        console.log(`🤖 IA procesando a: ${nombre} - ${telefono}`);

        // Usamos la librería oficial de Resend que acabas de importar
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['contacto.framaconsulting@gmail.com'], // Tu correo de Resend
            subject: `🔥 Nuevo prospecto: ${nombre}`,
            html: `
                <h2>Nuevo cliente capturado</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Correo:</strong> ${correoCliente}</p>
                <p><strong>Interés:</strong> ${interes}</p>
            `
        });

        // Si la librería detecta un error, lo escupe en la consola negra de Netlify
        if (error) {
            console.error("❌ Error de Resend:", error);
            return { statusCode: 500, body: JSON.stringify(error) };
        }

        console.log("✅ ¡Email enviado con éxito! ID:", data?.id);

        // Le confirmamos a ElevenLabs para que el agente siga hablando
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                estado: "Exito",
                instruccion_al_agente: "Listo. Dile al usuario que ya guardaste sus datos y pronto lo contactarán de Creando Detalles MMP."
            })
        };

    } catch (e) {
        console.error("❌ Error interno crítico:", e);
        return { statusCode: 500, body: "Error interno del servidor" };
    }
};