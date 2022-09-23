import React, { useState, useEffect } from "react";
import api from "../../service/api";
import { useNavigate } from "react-router-dom";
import "./style.css"

export default function User() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("users").then(response => {
            setUsers(response.data);
        })
    }, []);

    async function handleDelete(id) {
        try {
            await api.delete("/users/" + id);
            setUsers(users.filter(users => users.id !== id));
        } catch(err) {
            alert("Erro ao deletar.");
        }
    }

    return (
        <div id="user-container">
            <h1> Lista de Usuários </h1>
            <button className="button" id="create-link" onClick={() => navigate("create")}> Criar </button>
            <ul className="user-list">
                {
                    users.map(user => (
                        <li key={ user.id }>
                            <strong> Nome </strong>
                            <p> { user.nome } </p>
                            <strong> E-mail </strong>
                            <p> { user.email } </p>
                            <strong> Idade </strong>
                            <p> { user.idade } </p>
                            <strong> Empresa </strong>
                            <p> { user.empresa } </p>
                            <div className="actions">
                                <button className="button" onClick={() => handleDelete(user.id)} type="button"> Deletar </button>
                                <button className="button" onClick={() => navigate("update/" + user.id)} type="button"> Acessar </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}