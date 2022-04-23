import React from 'react'
import Container from '@mui/material/Container'
import axios from 'axios'
import { updateText } from '../Navegacion/Navbar';

class Sesion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            log: ""
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    }


    handleUsernameChange(event) { this.setState({ username: event.target.value }); }
    handlePassChange(event) { this.setState({ password: event.target.value }); }

    handleSubmit = () => {
        if (
            this.state.username === '' || this.state.password === ''
        ) {
            return;
        }

        axios.post("/api/auth/login", this.state)
            .then((response) => response.data)
            .then((data) => { });

        updateText("cool")
        this.props.history.push("/");
    }

    render() {
        return (
            <div class="pt-5" style={{ marginRight: 'auto', marginBottom: '40px' }} >
                <h1 class="text-center" style={{ margin: '30px' }}>Iniciar Sesión</h1>

                <Container maxWidth="xs" className="Container bg-info rounded text-white" style={{ background: 'linear-gradient(to bottom right, #ff1b6b, #45caff)' }}>
                    <div className="Cool" >
                        <form>
                            <div class="form-row text-center bg-indigo py-3">

                                <div class="form-group text-center bg-indigo">
                                    <label for="inputnombre">Usuario</label>
                                    <input type="text" class="form-control bg-indigo" id="inputnombre4" placeholder="Usuario" value={this.state.username} onChange={this.handleUsernameChange} required />
                                </div>

                                <div class="form-group text-center bg-indigo">
                                    <label for="inputPassword4">Contraseña</label>
                                    <input type="password" class="form-control" id="inputPassword4" placeholder="Contraseña" value={this.state.password} onChange={this.handlePassChange} required />
                                </div>

                                <div class="container text-center mt-3 container-fluid">
                                    <button type="button" class="btn col-md-8 ml-auto float-center" style={{ backgroundColor: '#ebf4f5', color: 'black' }} onClick={this.handleSubmit}>¡Listo!</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Sesion