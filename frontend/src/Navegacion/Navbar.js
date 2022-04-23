import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.png'
import './Navbar.css'
import axios from 'axios'

export function updateText(text) {
    this.setState({ text: text })
}

class navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            text: ""
        }

        this.HandleUserDetails = this.HandleUserDetails.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getNavBarButtons = this.getNavBarButtons.bind(this);
        this.Logout = this.Logout.bind(this);

        updateText = updateText.bind(this)

        this.setState({ text: "A" })

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    }

    async HandleUserDetails() {
        var userData;
        await axios
            .get("/api/park/user")
            .then((response) => { userData = response.data })
            .catch((error) => { return; });

        this.setState({ user: userData });
        console.log(this.state)
    }

    componentDidMount() {
        this.HandleUserDetails();
    }

    async Logout() {
        await axios.post("/api/auth/logout", {})
            .then((_) => { this.setState({ user: null }); });


    }



    getNavBarButtons() {
        try {
            if (this.state.user == null) {
                return (
                    <ul className="navbar-nav" style={{ textAlign: 'right' }}>

                        <li className="nav-item " style={{ fontSize: '18px', textAlign: 'right', border: 'solid 1px black', borderRadius: '8px', borderColor: '#a9ff68', margin: '8px', backgroundColor: '#a9ff68', color: '#FE6684' }} >
                            <Link className="nav-link active" style={{ color: '#FE6684' }} aria-current="page" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item" style={{ fontSize: '18px', border: 'solid 1px black', borderRadius: '8px', borderColor: '#a9ff68', margin: '8px', backgroundColor: '#a9ff68', color: '#FE6684' }}>
                            <Link className="nav-link active" style={{ color: '#FE6684' }} aria-current="page" to="/Sesion">Iniciar Sesión</Link>
                        </li>
                        <li className="nav-item" style={{ fontSize: '18px', border: 'solid 1px black', borderRadius: '8px', borderColor: '#a9ff68', margin: '8px', backgroundColor: '#a9ff68', color: '#FE6684' }}>
                            <Link className="nav-link active" style={{ color: '#FE6684' }} aria-current="page" to="/Registro">Registrarse</Link>
                        </li>

                        <li className="nav-item" style={{ fontSize: '18px', border: 'solid 1px black', borderRadius: '8px', borderColor: '#a9ff68', margin: '8px', backgroundColor: '#a9ff68', color: '#FE6684' }}>
                            <Link className="nav-link active " style={{ color: '#FE6684' }} aria-current="page" to="/Galeria" >Galería</Link>
                        </li>


                    </ul>
                );
            } else {
                return (
                    <ul className="navbar-nav" style={{ textAlign: 'right' }}>

                        <li className="nav-item" style={{ fontSize: '18px', border: 'solid 1px black', borderRadius: '8px', borderColor: '#a9ff68', margin: '8px', backgroundColor: '#a9ff68', color: '#FE6684' }}>
                            <Link className="nav-link active" style={{ color: '#FE6684' }} aria-current="page" to="/Usuario">Detalles Usuario</Link>
                        </li>
                        <li className="nav-item" style={{ fontSize: '18px', border: 'solid 1px black', borderRadius: '8px', borderColor: '#a9ff68', margin: '8px', backgroundColor: '#a9ff68', color: '#FE6684' }}>
                            <Link className="nav-link active" style={{ color: '#FE6684' }} aria-current="page" to="/Reservas" >Reservas</Link>
                        </li>

                        <li className="nav-item" style={{ fontSize: '18px', border: 'solid 1px black', borderRadius: '8px', borderColor: '#a9ff68', margin: '8px', backgroundColor: '#a9ff68', color: '#FE6684' }}>
                            <Link className="nav-link active " style={{ color: '#FE6684' }} aria-current="page" to="/Galeria" >Galería</Link>
                        </li>

                        <li className="nav-item" style={{ fontSize: '18px', border: 'solid 1px black', borderRadius: '8px', borderColor: '#a9ff68', margin: '8px', backgroundColor: '#a9ff68', color: '#FE6684' }}>
                            <button className="btn nav-link active" style={{ color: '#FE6684' }} onClick={() => { this.Logout() }} >Cerrar Sesión</button>
                        </li>
                    </ul>
                );
            }
        } catch { }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <Link to="/">
                        <img src={Logo} width="200" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">a</span>
                    </button>

                    <div style={{ backgroundColor: '#53d0f0', borderRadius: '8px' }}>

                        <div id="navbarSupportedContent" style={{ textAlign: 'right' }}>

                            {this.getNavBarButtons()}

                            <div className="container-flex">
                                <p>¡Diversión tan grande como nuestras montañas rusas!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

}

export default navbar