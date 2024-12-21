export const loginComponent = `
  <div id="user-session" style="display: flex; align-items: center; justify-content: center; column-gap: 1vh; padding: 10px; background-color: #ffffff; border-radius: 8px; box-shadow: none; border: none;">
    <img src="https://api.dicebear.com/8.x/lorelei/svg?size=48" alt="avatar" style="border-radius: 50%;"/>
    <p id="name" style="color: #333; font-size: 16px; margin: 0;">Nombre del Usuario</p>
    <button class='logout' onclick="redirectLogout()" style="background-color: #ff5c5c; border: none; padding: 8px 16px; color: white; font-size: 14px; border-radius: 5px; cursor: pointer;">Salir</button>
  </div>
`;
