import { useState, createContext, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth, db } from "../services/firebaseConnection";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({})


export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            const storageUser = localStorage.getItem('@ticketsPRO')

            if (storageUser) {
                setUser(JSON.parse(storageUser))
                navigate("/dashboard")
                setLoading(false)
            }

            setLoading(false)
        }

        loadUser()
    }, [])

    const signIn = async (email, password) => {
        // alert(`${email} \n ${password}`)

        setLoadingAuth(true)
        try {
            // Aguardamos a response do método de login
            let userCredential = await signInWithEmailAndPassword(auth, email, password)

            //pegamos o objeto user da response do método de login
            let user = userCredential.user

            //referencia do documento do usuário
            const docRef = doc(db, "users", user.uid)

            //aguardamos a response do método para buscar os docs do usuário
            const docSnap = await getDoc(docRef)

            //Montamos obj Data com a response de docSnap
            let data = {
                uid: user.uid,
                name: docSnap.data().name,
                email: user.email,
                avatarUrl: docSnap.data().avatarUrl
            }

            //setamos a state user com o objeto data
            setUser(data)

            storageUser(data)

            setLoadingAuth(false)

            toast.success(`Bem vindo(a) de volta, ${docSnap.data().name}`)

            navigate("/dashboard")


        }
        catch (error) {
            let toastMsg = handleFirebaseError(error)
            // console.error(error.code)
            toast.error(`Ops, algo deu errado: ${toastMsg}`)
        }
        finally {
            setLoadingAuth(false)
        }


    }

    const signUp = async (email, password, name) => {
        // alert(`${email} \n ${password} \n ${name}`)
        setLoadingAuth(true)

        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password)

            let user = userCredential.user

            let newUser = {
                name: name,
                avatarUrl: null
            }

            await setDoc(doc(db, "users", user.uid), newUser)

            let data = {
                uid: user.uid,
                email: user.email,
                name: name,
                avatarUrl: null
            }

            setUser(data)
            storageUser(data)
            // alert("Usuário cadastrado com sucesso!")

            toast.success(`Seja bem-vindo(a) ao sistema, ${data.name}!`)

            navigate("/dashboard")
        }

        catch (error) {
            let toastMsg = handleFirebaseError(error)

            toast.error(toastMsg)
        }
        finally {
            setLoadingAuth(false)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            toast.success("Esperamos você de volta!")

            localStorage.removeItem("@ticketsPRO")
            setUser(null)
        }
        catch (error) {
            console.error("Erro ao sair, \n ", error)
        }
    }

    const storageUser = (data) => {
        localStorage.setItem("@ticketsPRO", JSON.stringify(data))
    }

    const handleFirebaseError = (error) => {
        if (
            error.code === 'auth/user-not-found' ||
            error.code === 'auth/wrong-password' ||
            error.code === 'auth/invalid-credential'
        ) { return "Email ou senha inválida. Tente novamente" }

        else if (error.code === 'auth/network-request-failed') {
            return "Erro, confira sua conexão com a internet."
        }

        else if (error.code === 'auth/invalid-email') {
            return "Email inválido"
        }

        else if (error.code === 'email-already-in-use') {
            return "Email não disponível"
        }

        else {
            return "Erro inesperado, tente novamente mais tarde."
        }
    }
    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                logout,
                loadingAuth,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}