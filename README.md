# FRAMA Consulting — Sitio y Demo

Pequeño repositorio con la versión web de presentación de FRAMA Consulting.

## Descripción
Este proyecto contiene la landing estática y recursos para la agencia: HTML, CSS, JS, y funciones serverless usadas para recibir formularios.

## Características principales
- Landing responsiva con AOS y Lenis (animaciones y smooth scroll).
- Formulario de contacto que envía datos a una función serverless (Netlify Functions).
- Diseño enfocado en conversión y automatización para negocios locales.

## Estructura del repositorio
- [index.html](index.html) — entrada raíz de la demo.
- [framaconsultory/index.html](framaconsultory/index.html) — versión principal de la landing.
- [framaconsultory/template/js/index.js](framaconsultory/template/js/index.js) — lógica del frontend (AOS, Lenis, menú, form submit).
- [framaconsultory/template/css/styles.css](framaconsultory/template/css/styles.css) — estilos principales.
- [framaconsultory/netlify/functions/recibir_datos.js](framaconsultory/netlify/functions/recibir_datos.js) — función serverless para recibir el formulario.
- `netlify/` y `framaconsultory/netlify/` — configuración relacionada a Netlify (deployment/functions).

> Nota: varios assets (logos, imágenes de casos) se encuentran en `img/`.

## Requisitos
- Node.js 14+ (para trabajar con Netlify CLI o servidores locales si es necesario).
- Netlify CLI (opcional, recomendado para probar funciones locally):

  npm install -g netlify-cli

## Instalación y ejecución local
1. Clonar el repositorio.
2. Abrir el proyecto en tu editor.

Para servir la versión estática rápida (sin funciones):
- Usa una extensión de Live Server o un servidor simple, por ejemplo:

  npx serve .

Para desarrollo con funciones (recomendado si quieres probar `recibir_datos.js`):
1. Instala Netlify CLI si no lo tienes: `npm install -g netlify-cli`.
2. Desde la carpeta raíz del proyecto ejecuta:

  netlify dev

Esto servirá la carpeta estática y pondrá en marcha las Netlify Functions en local.

## Despliegue
- La forma más sencilla es conectar el repositorio a Netlify (GitHub/GitLab/Bitbucket) y usar la configuración por defecto. La carpeta raíz contiene `netlify.toml` en los subfolders para funciones; Netlify detectará las funciones en `netlify/functions` o en la carpeta configurada.

## Notas de implementación
- El formulario del frontend hace POST a `/` y el handler es `recibir_datos.js`. Revisa [framaconsultory/template/js/index.js](framaconsultory/template/js/index.js).
- Se usan bibliotecas externas por CDN: AOS, Lenis, Phosphor Icons y un widget de ElevenLabs.
- Para inspeccionar estilos: [framaconsultory/template/css/styles.css](framaconsultory/template/css/styles.css).

## Contribuir
- Para cambios rápidos en la UI modifica los archivos dentro de `framaconsultory/template/`.
- Para ajustar la función de backend revisa `framaconsultory/netlify/functions/recibir_datos.js`.

## Licencia y contacto
- Este repositorio no incluye una licencia específica. Añade `LICENSE` si deseas definirla.
- Si quieres que prepare scripts `npm` o CI/CD para desplegar automáticamente, dime y lo agrego.
