export const loginComponent = `
     <div id="user-session" style="display: flex; flex-flow: column; column-gap: 1vh; justify-content: center; align-items: center;">
         <a class="link-a" style="display: flex; flex-flow: row; align-items: center; justify-content: center;"><img 
       src="https://api.dicebear.com/8.x/lorelei/svg?size=48"
       alt="avatar"
     /><i class="fa-solid fa-bars" style=" cursor: pointer"></i></a>
         <div style="display: flex; flex-flow: row  ; justify-content: center; column-gap: 0.3vw;">
             <p class="data" id="name" style="color: aliceblue; font-size: x-small;"></p>
             <p class="data" id="surname" style="color: aliceblue; font-size: x-small;"></p>
    </div>
     </div>

     <nav id="secondary" >
             <ul class="menu">
                <li>
                    <a class="link-a" href="/profile">Perfil</a>
                </li>
                 <li>
                    <a class="link-a" href="/favoritos" >Favoritos<i class="fa-regular fa-heart"></i></a>
                 </li>
                 <li>
                   <a class="link-a" href="#" onclick="logout()">Salir<i class="fa-regular fa-circle-xmark"></i></i></a>
                 </li>
             </ul>
     </nav>
`;
