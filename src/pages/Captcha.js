import React, { useState, useEffect } from "react";

export default function CaptchaComponent() {
  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);

  useEffect(() => {
    // Hacer una solicitud GET para obtener la imagen de Captcha desde tu servidor
    fetch("http://localhost:4000/captcha")
      .then((response) => response.text())
      .then((data) => {
        console.log("Respuesta del servidor (en texto):", data + " aqui data"); // Muestra la respuesta en la consola
        const captchaImageURL = "data:image/svg+xml;base64," + btoa(data);
        setCaptchaImage(captchaImageURL);
        console.log(captchaImageURL + "...aaaaaaaaaaaaaaaaaaaa");
      })
      .catch((error) => {
        console.error("Error al obtener la imagen de Captcha:", error);
      });
  }, []);

  const handleCaptchaInputChange = (e) => {
    setCaptchaInput(e.target.value);
  };

  const handleSubmit = () => {
    // Realiza una solicitud al servidor para verificar reCAPTCHA v3
    fetch("http://localhost:4000/verify-recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recaptchaToken: "6LdQt4QoAAAAAETpz94ehT4JbsfEtDp13SivHywg",
      }), // Reemplaza con el token generado por reCAPTCHA
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // El reCAPTCHA fue verificado correctamente, ahora puedes enviar el formulario
          alert("reCAPTCHA verificado correctamente.");
          // ... código para enviar el formulario ...
        } else {
          // El reCAPTCHA no fue verificado correctamente
          alert("reCAPTCHA incorrecto. Inténtalo de nuevo.");
        }
      })
      .catch((error) => {
        console.error("Error al verificar reCAPTCHA:", error);
      });
  };

  return (
    <div>
      <h2>Captcha</h2>
      <div
        class="g-recaptcha"
        data-sitekey="6LfW_YQoAAAAAL3C7a8zGBVmG7IN3g1Pg94iQjYp"
        data-size="normal"
      ></div>
      {/* Esto solo va en formulario */}
      {captchaValid && <p>Captcha válido. Realiza la acción deseada.</p>}
    </div>
  );
}
