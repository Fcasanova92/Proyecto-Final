export const errors = {
  emailError: 'Formato de email invalido',

  telephoneError: 'Formato de telefono invalido',

  textError: 'Solamente puede contener letras',

  empty: 'Campo requerido',

  codeError: `
<ul style="display: flex; flex-flow: column; row-gap: 0.25vw; justify-content: flex-start">
  <li>Mínimo 6 caracteres</li>
  <li>Solo numeros o letras</li>
</ul>`,

  passwordError: `
<ul style="display: flex; flex-flow: column; row-gap: 0.25vw; justify-content: flex-start">
  <li>Mínimo ocho caracteres</li>
  <li>Caracter especial</li>
  <li>Mayúscula</li>
  <li>Al menos un número</li>
</ul>`,
};
