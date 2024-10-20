import React, { useContext, useState } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth'
import avatar from "../../assets/avatar.png"

import "./profile.css"
import { toast } from 'react-toastify'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../services/firebaseConnection'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const Profile = () => {

    const { user, storageUser, setUser } = useContext(AuthContext)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)

    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)

    const handleFileImage = (e) => {

        //verifica se há algum arquivo selecionado pelo usuário
        if (e.target.files[0]) {

            //obtemos o primerio arquivo da lista do "e - (event)"
            const image = e.target.files[0]

            //verificar o tipo do aarquivo
            if (image.type === "image/jpeg" || image.type === "image/png") {
                setImageAvatar(image) //Armazena a imagem

                //cria uma URL temporária para exibir a imagem
                setAvatarUrl(URL.createObjectURL(image))
            }
            else {

                //retorna um aviso caso a imagem não seja do tipo específico
                toast.error("Envie uma imagem do tipo PNG ou JPEG")
                setImageAvatar(null)
                return
            }
        }
    }

    const handleUpload = async () => {
        const currentUid = user.uid

        //referência do local que será armazenada a foto
        //com o nome "fotoPerfil"
        const uploadRef = ref(storage, `images/${currentUid}/fotoPerfil`)

        try {

            //faz o upload para o storage
            const uploadTask = await uploadBytes(uploadRef, imageAvatar)

            //var com a response de uploadTask
            //que retorna a URL referência da foto que foi feita upload
            const imgRef = uploadTask.ref

            //getDownloadURL gera a URL para que possamos acessar a img
            const imgDownloadURL = await getDownloadURL(imgRef)

            //campos a serem atualizados no Firebase
            const updateDataUser = {
                name: name,
                avatarUrl: imgDownloadURL
            }

            //referência do usuário no db
            const docRef = doc(db, "users", user.uid)

            //método para atualizar o documento do usuário no db
            await updateDoc(docRef, updateDataUser)

            //obj para atualizarmos o contexto user da aplicação
            const newLocalUserData = {
                ...user,
                name: name,
                avatarUrl: imgDownloadURL
            }

            setUser(newLocalUserData)
            storageUser(newLocalUserData)
            toast.success("Dados atualizados com sucesso!")
        }
        catch (error) {
            console.error(error)
        }

    }

    const handleUpdateName = async () => {
        try {
            //campo a ser atualizado no db
            let newName = { name: name }

            //referência do usuário no db
            const docRef = doc(db, "users", user.uid)

            //método para atualizar o documento do usuário no db
            await updateDoc(docRef, newName)

            //obj para atualizarmos o contexto user da aplicaçãp
            let newDataName = {
                ...user,
                name: name
            }

            setUser(newDataName)
            storageUser(newDataName)
            toast.success("Nome atualizado com sucesso!")
        }
        catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (imageAvatar === null && name !== "") {
            try {
                await handleUpdateName()
            }
            catch (error) {
                toast.error("Ops, erro ao atualizar!")
            };

        }

        else if (name !== "" && imageAvatar !== null) {
            try {
                await handleUpload()
            }

            catch (error) {
                toast.error("Ops, erro ao atualizar!")
            }
        }

    }

    return (
        <div>
            <Header />

            <div className='content'>

                <Title title="Meu perfil">
                    <FiSettings size={25} />
                </Title>

                <div className='container'>

                    <form className='form-profile' onSubmit={handleSubmit}>

                        <label className='label-avatar'>

                            <span>
                                <FiUpload color='#fff' size={25} />
                            </span>

                            <input
                                type='file'
                                accept='image/*'
                                onChange={handleFileImage}
                            />

                            <img
                                src={avatarUrl === null ? avatar : avatarUrl}
                                alt='Foto de Perfil'
                                width={200}
                                height={200}
                            />

                        </label>

                        <label>Nome</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Email</label>
                        <input
                            type='text'
                            disabled={true}
                            value={email}
                        />

                        <button
                            type="submit"> Salvar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile