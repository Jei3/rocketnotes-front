import { useState } from 'react'
import { Container, Form, Avatar } from "./styles";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';


import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import { useNavigate } from "react-router-dom";

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'


import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

export function Profile(){
    const { user, updateProfile } = useAuth()
    const navigate = useNavigate();

    const [ name, setName ] = useState(user.name);
    const [ email, setEmail ] = useState(user.email);
    const [ passwordOld, setPasswordOld ] = useState();
    const [ passwordNew, setPasswordNew ] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    const [ avatar, setAvatar ] = useState(avatarUrl);
    const [ avatarFile, setAvatarFile ] = useState(null);

    function handleBack(){
        navigate(-1);
    }

    async function handleUpdate(){
        const updated= {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }

        const userUpdated = Object.assign(user, updated)

        await updateProfile({ userUpdated, avatarFile })
    }

    function handleChangeAvatar(event){
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return(
        <Container>
            <header>
                <button type="button" onClick={handleBack}>
                    <FiArrowLeft /> 
                </button>
            </header>
        
            <Form>
                <Avatar>
                    <img 
                        src={avatar} 
                        alt="Foto do Usuário" 
                    />

                    <label htmlFor="avatar">
                        <FiCamera />

                        <input 
                            id="avatar"
                            type="file"
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </Avatar>

                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input 
                    placeholder="Email"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input 
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                />
                <Input 
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate}/>
            </Form>
        </Container>

   
    )
}