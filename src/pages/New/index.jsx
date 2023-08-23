import { useState } from "react";
import { api } from "../../services/api";

import { useNavigate } from "react-router-dom";

import { Container, Form } from "./styles";


import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";   
import { Section } from "../../components/Section";   
import { Button } from "../../components/Button";   
import { ButtonText } from "../../components/ButtonText";   


export function New(){
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");


    const [ links, setLinks ] = useState([]);
    const [ newLink, setNewLink ] = useState("");

    const [ tags, setTags ] = useState([]);
    const [ newTag, setNewTag ] = useState("");

    const navigate = useNavigate();


    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink]);
        setNewLink("");
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    function handleBack(){
        navigate(-1);
    }


    async function handleNewNote(){
        if(!title){
            return alert("digite o título da nota")
        }

        if(newLink){
            return alert("Existe um link que não foi salvo, deseja ignora-lá?")
        }
        
        if(newTag){
            return alert("Existe uma tag que não foi salva, deseja ignora-lá?")
        }
        

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });

        alert("Nota criada com sucesso!");
        // direciona o cliente de volta para a home
        navigate(-1);
    }

    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        <ButtonText title="Voltar" onClick={handleBack} />
                    </header>

                    <Input 
                        placeholder="Título"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Textarea 
                        placeholder="Observações"
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="Links Úteis" >
                        {
                            links.map((link, index) =>(
                                <NoteItem 
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }
                        <NoteItem 
                            placeholder="Novo link" 
                            isNew
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                <NoteItem 
                                    key={String(index)}
                                    value={tag}
                                    onClick={() => handleRemoveTag(tag)}
                                />
                                ))
                            }
                            
                            <NoteItem 
                                placeholder="Nova tag" 
                                isNew
                                onChange={e => setNewTag(e.target.value)}
                                value={newTag}
                                onClick={handleAddTag}
                            />
                        </div>        
                    </Section>


                    <Button 
                        title="Salvar" 
                        onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    );
}