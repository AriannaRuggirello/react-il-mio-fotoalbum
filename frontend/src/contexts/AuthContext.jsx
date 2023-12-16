import { createContext, useContext , useState} from "react";
// creiamo il contesto
const AuthContext = createContext();

// creiamo il provider per trasmettere i valori
function AuthProvider({ children }) {

    // isLoggedIn una variabile booleana che identifica
    // se l'utente è loggato o no.
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // user un oggetto che conterrà tutte le
    // informazioni dell'utente.
    const [user, setUser] = useState({});

    // const navigate = useNavigate ();

    // handleLogin una funzione che effettuerà la
    // chiamata al backend per autenticare l'utente.
    function handleLogin(payload) 
    {
      

    // Qui effettueremo la chiama API al server backend
    }

    // handleLogout una funzione che si occuperà di
    // effettuare il logout dell'utente.
    function handleLogout() {
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