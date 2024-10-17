import { useState, createContext, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../services/firebaseConnection";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({})


export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)

    const signIn = (email, password) => {
        alert(`${email} \n ${password}`)
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
            const errorMsg = error.message || "Erro ao cadastrar"
            alert(`Erro: ${errorMsg}`)
        }
        finally {
            setLoadingAuth(false)
        }
    }

    const storageUser = (data) => {
        localStorage.setItem("@ticketsPRO", JSON.stringify(data))
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                loadingAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}