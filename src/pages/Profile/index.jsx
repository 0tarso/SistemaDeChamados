import React, { useContext, useState } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth'
import avatar from "../../assets/avatar.png"

import "./profile.css"
import { toast } from 'react-toastify'

const Profile = () => {

    const { user, storageUser } = useContext(AuthContext)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)

    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)

    const handleFileImage = (e) => {
        if (e.target.files[0]) {

            const image = e.target.files[0]

            if (image.type === "image/jpeg" || image.type === "image/png") {
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            }
            else {
                toast.error("Envie uma imagem do tipo PNG ou JPEG")
                setImageAvatar(null)
                return
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

                    <form className='form-profile'>

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
                            placeholder='Seu Nome'
                            value={name}
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