/**
 * V/ADIVER PRO 2026 - AUTH CORE (VERSIÓN FINAL ESTABLE)
 */

const API_URL = '/api/auth';

/* ==========================================
   1. NAVBAR DINÁMICA
========================================== */
const renderUserNav = () => {
    const userData = localStorage.getItem('vadiver_user');
    let user = null;

    try {
        user = JSON.parse(userData);
    } catch (e) {
        console.error("Error user parse:", e);
    }

    const guestZone = document.getElementById('guest-zone');
    const userZone = document.getElementById('user-zone');
    const userName = document.getElementById('user-nav-name');
    const userRole = document.getElementById('user-nav-role');
    const userAvatar = document.getElementById('user-avatar');

    if (!guestZone || !userZone) return;

    if (user) {
        guestZone.style.display = 'none';
        userZone.style.display = 'flex';

        // ⚓ CONTROL INTEGRADO DEL BOTÓN INICIO NEÓN
        let btnInicio = document.getElementById('nav-btn-home');
        if (!btnInicio) {
            btnInicio = document.createElement('button');
            btnInicio.id = 'nav-btn-home';
            btnInicio.className = 'btn-home-neon'; 
            btnInicio.innerHTML = '<i class="fa-solid fa-house"></i> INICIO';
            btnInicio.onclick = () => window.location.href = 'index.html';
            userZone.insertBefore(btnInicio, userZone.firstChild);
        }

        if (userName) userName.innerText = user.nombre || "Usuario";
        if (userRole) userRole.innerText = user.rol || "cliente";

        if (userAvatar) {
            // CORREGIDO: Se reincorporó 'https://' para evitar que rompa el fetch del login
            const avatarUrl = user.avatar && user.avatar !== 'null' && user.avatar !== ''
                ? user.avatar
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nombre || 'User')}&background=0D8ABC&color=fff`;

            userAvatar.src = avatarUrl;
        }

    } else {
        guestZone.style.display = 'flex';
        userZone.style.display = 'none';

        // Remueve el botón si no hay sesión activa
        const btnInicio = document.getElementById('nav-btn-home');
        if (btnInicio) btnInicio.remove();
    }
};

/* ==========================================
   2. PERFIL
========================================== */
const cargarPerfil = () => {
    const userData = localStorage.getItem('vadiver_user');
    if (!userData) return;

    let user;
    try {
        user = JSON.parse(userData);
    } catch (e) {
        console.error("Error parse:", e);
        return;
    }

    const nombre = document.getElementById('perfilNombre');
    const email = document.getElementById('perfilEmail');
    const telefono = document.getElementById('perfilTelefono');
    const preview = document.getElementById('perfilAvatarPreview');

    if (nombre) nombre.value = user.nombre || '';
    if (email) email.value = user.email || '';
    if (telefono) telefono.value = user.telefono || '';

    if (preview) {
        const avatarUrl = user.avatar && user.avatar !== 'null' && user.avatar !== ''
            ? user.avatar
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nombre || 'User')}&background=0D8ABC&color=fff`;

        preview.src = avatarUrl;
    }
};

/* ==========================================
   PREVISUALIZAR FOTO
========================================== */
document.addEventListener('change', (e) => {
    if (e.target.id === 'perfilFoto') {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const preview = document.getElementById('perfilAvatarPreview');
            if (preview) preview.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }
});

/* ==========================================
   GUARDAR PERFIL (UPLOAD + DB)
========================================== */

const guardarPerfil = async () => {

    const userData = localStorage.getItem('vadiver_user');

    if (!userData)
        return alert("No hay sesión");

    const user = JSON.parse(userData);

    const nombre =
        document.getElementById('perfilNombre')?.value;

    const telefono =
        document.getElementById('perfilTelefono')?.value;

    const fileInput =
        document.getElementById('perfilFoto');

    // TOKEN — SOLO UNA VEZ
    const token =
        localStorage.getItem('vadiver_token');

    console.log("TOKEN PERFIL:", token);

    let avatarUrl = user.avatar || "";

    try {

        /* SUBIR IMAGEN */
        if (
            fileInput &&
            fileInput.files.length > 0
        ) {

            const formData =
                new FormData();

            formData.append(
                'avatar',
                fileInput.files[0]
            );

            const uploadRes =
                await fetch(
                    '/api/upload-avatar',
                    {

                        method:'POST',

                        headers:{
                            'Authorization':
                            `Bearer ${token}`
                        },

                        body:formData

                    }
                );

            const uploadData =
                await uploadRes.json();

            if(uploadData.success){

                avatarUrl =
                    uploadData.url;

            }else{

                return alert(
                    "❌ Error subiendo imagen"
                );

            }

        }

        /* GUARDAR EN DB */

        const res = await fetch(
            '/api/auth/update-profile',
            {

                method:'POST',

                headers:{
                    'Content-Type':
                    'application/json',

                    'Authorization':
                    `Bearer ${token}`
                },

                body:JSON.stringify({

                    id:user.id,
                    nombre,
                    telefono,
                    avatar:avatarUrl

                })

            }
        );

        const data =
            await res.json();

        if(data.success){

            const updatedUser = {

                ...user,
                nombre,
                telefono,
                avatar:avatarUrl

            };

            localStorage.setItem(
                'vadiver_user',
                JSON.stringify(updatedUser)
            );

            alert(
                "✅ Perfil actualizado"
            );

            renderUserNav();

            closePerfilModal();

        }else{

            alert(
                "❌ Error guardando perfil"
            );

        }

    }catch(err){

        console.error(err);

        alert(
            "❌ Error general"
        );

    }

};
/* ==========================================
   ABRIR / CERRAR PERFIL
========================================== */
const openPerfilModal = () => {
    const modal = document.getElementById('perfilModal');
    if (!modal) return;

    modal.style.display = 'flex';
    cargarPerfil();
};

const closePerfilModal = () => {
    const modal = document.getElementById('perfilModal');
    if (modal) modal.style.display = 'none';
};

/* ==========================================
   3. RESPUESTA AUTH
========================================== */
/* ==========================================
   3. RESPUESTA AUTH
========================================== */

const handleAuthResponse = (result) => {

    console.log("AUTH RESULT:", result);

    if (result.success) {

        // GUARDAR TOKEN
        if(result.token){
            localStorage.setItem(
                'vadiver_token',
                result.token
            );
        }

        // GUARDAR USER
        localStorage.setItem(
            'vadiver_user',
            JSON.stringify(result.user)
        );

        console.log(
            "TOKEN DESPUES GUARDAR:",
            localStorage.getItem(
                'vadiver_token'
            )
        );

        alert(`⚓ Bienvenido ${result.user.nombre}`);

        window.location.href =
            result.user.rol === 'admin'
            ? 'admin-dashboard.html'
            : 'tienda.html';

    } else {

        alert(
            "❌ ERROR: " +
            result.message
        );

    }

};

/* ==========================================
   4. MODAL LOGIN
========================================== */
function openModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('modalTitle');
    const extraFields = document.getElementById('registroExtraFields');
    const submitBtn = document.getElementById('authSubmitBtn');
    const nameInput = document.getElementById('userName');
    const phoneInput = document.getElementById('userPhone');

    if (!modal) return;

    modal.style.display = 'flex';

    if (mode === 'registro') {
        title.innerText = "Crear Usuario V/ADiver";
        if (extraFields) extraFields.style.display = 'block';
        if (nameInput) nameInput.required = true;
        if (phoneInput) phoneInput.required = true;
        submitBtn.innerText = "REGISTRARME";
    } else {
        title.innerText = "Acceso al Sistema";
        if (extraFields) extraFields.style.display = 'none';
        if (nameInput) nameInput.required = false;
        if (phoneInput) phoneInput.required = false;
        submitBtn.innerText = "INGRESAR";
    }
}

function closeModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.style.display = 'none';
}

/* ==========================================
   CERRAR MODALES CLICK FUERA
========================================== */
window.onclick = (event) => {
    const authModal = document.getElementById('authModal');
    const perfilModal = document.getElementById('perfilModal');

    if (event.target === authModal) closeModal();
    if (event.target === perfilModal) closePerfilModal();
};

/* ==========================================
   5. LOGIN / REGISTRO
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    renderUserNav();

    const authForm = document.getElementById('authForm');

    if (authForm) {

        authForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            const submitBtn = document.getElementById('authSubmitBtn');

            const isRegistro =
                submitBtn.innerText
                .toUpperCase()
                .includes("REGISTRAR");

            const originalText = submitBtn.innerText;

            submitBtn.innerText = "CONECTANDO...";
            submitBtn.disabled = true;

            const userData = {

                email: document
                    .getElementById('userEmail')
                    .value
                    .trim(),

                password: document
                    .getElementById('userPass')
                    .value,

                rol:'cliente'

            };

            if(isRegistro){

                userData.nombre =
                    document
                    .getElementById('userName')
                    ?.value
                    .trim() || "Buzo";

                userData.telefono =
                    document
                    .getElementById('userPhone')
                    ?.value
                    .trim() || "";

            }

            try{

                const endpoint =
                    isRegistro
                    ? '/register'
                    : '/login';

                const response = await fetch(
                    `${API_URL}${endpoint}`,
                    {

                        method:'POST',

                        headers:{
                            'Content-Type':'application/json'
                        },

                        body:JSON.stringify(userData)

                    }
                );

                const result = await response.json();

                console.log(
                    "LOGIN/REGISTER RESULT:",
                    result
                );

                handleAuthResponse(result);

                console.log(
                    "TOKEN GUARDADO:",
                    localStorage.getItem('vadiver_token')
                );

            }catch(error){

                console.error(
                    "🔥 Error:",
                    error
                );

                alert(
                    "⚠️ Error de conexión"
                );

            }finally{

                submitBtn.innerText =
                    originalText;

                submitBtn.disabled = false;

            }

        });

    }

});

/* ==========================================
   6. DROPDOWN
========================================== */
const toggleUserMenu = () => {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) dropdown.classList.toggle('show');
};

/* ==========================================
   7. LOGOUT
========================================== */
const logout = () => {
    localStorage.removeItem('vadiver_user');
    localStorage.removeItem('vadiver_cart');

    alert("⚓ Sesión cerrada");

    renderUserNav();
    window.location.href = 'index.html';
};