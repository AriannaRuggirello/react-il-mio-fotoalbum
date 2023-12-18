import axios from "axios" 

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 3000,
})


// Recuperiamo l'access token dal localStorage e, se è presente, aggiungiamo una chiave
// "Authorization" all'header della richiesta,con il valore "Bearer" seguito dal token.
instance.interceptors.request.use(function (config) {
const token = localStorage.getItem("accessToken");
if (token) {
config.headers["Authorization"] = `Bearer ${token}`;
}
return config;
});

// Intercettiamo la risposta dal backend, e se il codice di stato è 401 (Non autorizzato),rimuoviamo tutti i dati dal localStorage e reindirizziamo l'utente alla pagina di login.
instance.interceptors.response.use(
function (response) {
return response;
},
function (error) {
if (error.response.status === 401) {
localStorage.clear();
window.location = "/login";
}
return Promise.reject(error);
}
);

export default instance;