export const welcomeMessage = (nombre, code) => {
  return `<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código de Verificación</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333333;
        font-size: 24px;
        text-align: center;
      }
      p {
        color: #666666;
        font-size: 16px;
        text-align: center;
      }
      .verification-code {
        font-size: 20px;
        font-weight: bold;
        color: #4CAF50;
        text-align: center;
        padding: 15px;
        margin: 20px 0;
        background-color: #f4f4f9;
        border: 2px solid #4CAF50;
        border-radius: 5px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #888888;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>¡Bienvenido, ${nombre}!</h1>
      <p>Gracias por unirte a nosotros. Para completar tu registro, por favor ingresa el siguiente código de verificación en la página correspondiente:</p>
      <div class="verification-code">${code}</div>
      <div class="footer">
        <p>Si no solicitaste este registro, puedes ignorar este mensaje.</p>
      </div>
    </div>
  </body>
</html>`;
};
