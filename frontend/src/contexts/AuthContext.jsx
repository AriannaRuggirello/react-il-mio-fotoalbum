import { createContext, useContext , useState} from "react";
const AuthContext = createContext();
import axios from "../../utilities/AxiosClient";


// creiamo il provider per trasmettere i valori
function AuthProvider({ children }) {

    // isLoggedIn una variabile booleana che identifica
    // se l'utente è loggato o no.

    // se è presente l'accessToken nel localStorage restituiamo true altrimenti false.
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) return true;
        return false;
        });

    // user un oggetto che conterrà tutte le
    // informazioni dell'utente.

    // se è presente l'elemento user nel localStorage lo restituiamo trasformato ad oggetto altrimenti null.
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
        });


    // handleLogin una funzione che effettuerà la
    // chiamata al backend per autenticare l'utente.
    async function handleLogin(payload) 
    {
    // Qui effettueremo la chiama API al server backend
      
    try {
        const { data } = await axios.post(`/login`, payload);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.accessToken);
        setUser(data.user);
        setIsLoggedIn(true);
    } catch (error) {
        console.error("Errore durante il login:", error.message);
        throw new Error("Errore durante il login");
    }}
    // handleLogout una funzione che si occuperà di
    // effettuare il logout dell'utente.
    function handleLogout() {
        localStorage.clear();
        setUser(null);
        setIsLoggedIn(false);
        }

    const values = {
        isLoggedIn,
        user,
        handleLogin,
        handleLogout
    };

    return (
    // Passiamo queste informazioni come VALUES al
    // provider di AuthContext.
        <AuthContext.Provider value={values}>
        {children}
        </AuthContext.Provider>
    );

  
}

// Creiamo il custom hook per
// semplificare il recupero di questi dati.
function useAuth(){
    return useContext(AuthContext);
}

// Esportiamo sia il componente AuthProvider
// che il custom hook.
export { AuthProvider, useAuth };