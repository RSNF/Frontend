import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css"
import api from "../../service/api";

export default function Profile() {

    const {id} = useParams();
    const navigate = useNavigate();
    const initUser = {
        nome: "",
        email: "",
        idade: 0,
        empresa: ""
    }
    const [user, setUser] = useState(initUser);

    useEffect(() => {
        if (id) {
            api.get(`/users/${id}`).then((response) => {
                setUser(...response.data);
            });
        }
    }, [id]);

    function onSubmit(ev) {
        ev.preventDefault();
        if (id) {
            api.put("/users/" + user.id, user).then((response) => {
                navigate("/");
            });
        } else {
            api.post("/users", user).then((response) => {
                navigate("/");
            });
        }
    }

    function onChange(ev) {
        const {name, value} = ev.target;
        setUser({...user, [name]:value});
    }

    return (
        <div id="profile-container">
            <h1> Cadastro </h1>
            <form onSubmit={onSubmit}>
                <div className="inputs">
                    <strong> Nome: </strong>
                    <input name="nome" onChange={onChange} value={ user.nome }/>
                    <strong> E-mail: </strong>
                    <input type="email" onChange={onChange} name="email" value={ user.email }/>
                    <strong> Idade: </strong>
                    <input name="idade" onChange={onChange} value={ user.idade }/>
                    <strong> Empresa: </strong>
                    <input name="empresa" onChange={onChange} value={ user.empresa }/>
                </div>
                <div className="actions">
                    <button className="button" onClick={() => navigate("/")}> Voltar </button>
                    <button className="button" type="submit"> Salvar </button>
                </div>
            </form>
        </div>
    )
}