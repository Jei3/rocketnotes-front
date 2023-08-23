import { Container, Links, Content } from './styles.js';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { api } from '../../services/api.js';

import { Tags } from '../../components/Tags';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';


export function Details() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const params = useParams(); 

    useEffect(() => {
        async function fetchNote(){
            const response = await api.get(`/notes/${params.id}`);
            setData(response.data);
        }

        fetchNote();
    }, []);

    function handleBack(){
            navigate(-1);
    }

    async function handleRemove(){
        const confirm = window.confirm("Deseja realmente remover a nota?")

        if(confirm){
            await api.delete(`/notes/${params.id}`);
            handleBack();
        }
    }

    return(
        <Container>
             <Header />
            {
                // se tiver contéudo irá mostar
                data && 
                <main>
                    <Content>

                
                    <ButtonText 
                        title="Excluir Nota" 
                        onClick={handleRemove}
                    />

                    <h1>
                        {data.title}
                    </h1>
                    

                    <p> 
                        {data.description}
                    </p>                    
                    { 
                    data.links &&
                        <Section title="Links úteis">
                            <Links>
                                {
                                        data.links.map(link => (
                                        <li key={String(link.id)}>
                                        <a 
                                            href={link.url}
                                            target='_blank'
                                        >
                                            {link.url}
                                        </a></li>
                                    ))
                                }
                            </Links>
                        </Section>
                    }
                    {
                        data.tags &&
                        <Section title="Marcadores">
                            {
                                data.tags.map(tag => (
                                <Tags 
                                    key={String(tag.id)}
                                    title={tag.name} 
                                />
                                ))
                            }
                        </Section>
                    }

                    <Button title="Voltar" onClick={handleBack}/>
                </Content>
                </main>
            }
        </Container>
    )
}