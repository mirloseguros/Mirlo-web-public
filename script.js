(() => {
  const config = window.MIRLO_CONFIG || {};
  const whatsapp = String(config.whatsapp || "").replace(/\D/g, "");
  const email = config.email || "";
  const defaultMessage = config.whatsappMessage || "Hola, quiero recibir orientación de MIRLO.";

  const buildWhatsAppUrl = (message = defaultMessage) =>
    whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}` : "#contacto";

  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = buildWhatsAppUrl();
    link.target = whatsapp ? "_blank" : "_self";
    link.rel = whatsapp ? "noopener" : "";
  });

  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = email ? `mailto:${email}` : "#contacto";
  });

  document.querySelectorAll("[data-location]").forEach((node) => {
    node.textContent = config.location || "Colombia";
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }));

  const serviceSelect = document.querySelector('select[name="service"]');
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      if (serviceSelect) serviceSelect.value = link.dataset.service || "";
    });
  });

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;
  document.querySelectorAll(".reveal").forEach((node) => {
    if (observer) observer.observe(node);
    else node.classList.add("visible");
  });

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll("[required]")];
    fields.forEach((field) => field.classList.toggle("invalid", !field.checkValidity()));
    const invalid = fields.find((field) => !field.checkValidity());
    if (invalid) {
      status.textContent = "Revisa los campos obligatorios antes de continuar.";
      invalid.focus();
      return;
    }

    const data = new FormData(form);
    const message = [
      "Hola, quiero recibir orientación de MIRLO.",
      `Nombre: ${data.get("name")}`,
      `Celular: ${data.get("phone")}`,
      `Correo: ${data.get("email")}`,
      `Interés: ${data.get("service")}`,
      data.get("message") ? `Contexto: ${data.get("message")}` : ""
    ].filter(Boolean).join("\n");

    if (whatsapp) {
      window.open(buildWhatsAppUrl(message), "_blank", "noopener");
      status.textContent = "Abrimos WhatsApp con tu solicitud. Revisa el mensaje y envíalo para continuar. ";
    } else if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent("Solicitud de orientación MIRLO")}&body=${encodeURIComponent(message)}`;
      status.textContent = "La solicitud quedó preparada en tu aplicación de correo.";
    } else {
      status.textContent = "Configura el WhatsApp o correo de MIRLO en config.js.";
    }
  });
})();
