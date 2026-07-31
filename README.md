# MIRLO — Sitio web v1

Prototipo funcional y responsivo basado en el Manual Ejecutivo MIRLO y en el moodboard aprobado para la landing page.

## Archivos

- `index.html`: estructura y contenido.
- `styles.css`: sistema visual, responsive y animaciones.
- `script.js`: menú móvil, formulario, WhatsApp y revelado progresivo.
- `config.js`: datos de contacto que deben actualizarse antes de publicar.
- `assets/`: logos SVG aprobados e imágenes de referencia.

## Configuración obligatoria antes de publicar

Editar `config.js`:

```js
window.MIRLO_CONFIG = {
  whatsapp: "573001234567",
  email: "hola@mirlo.com.co",
  location: "Medellín, Colombia",
  whatsappMessage: "Hola, quiero recibir orientación de MIRLO."
};
```

El número de WhatsApp debe incluir código de país y no usar espacios ni el signo `+`.

## Vista local

Se puede abrir `index.html` directamente. Para una prueba más fiel, ejecutar en la carpeta:

```bash
python -m http.server 8000
```

Luego abrir `http://localhost:8000`.

## Alcance de esta versión

Es un frontend funcional. Para recibir formularios en una base de datos o CRM se debe conectar el formulario a un backend, servicio de formularios o automatización.

## Publicación

La carpeta puede publicarse en servicios estáticos como Netlify, Cloudflare Pages, GitHub Pages o cualquier hosting convencional.
