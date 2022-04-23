import React from 'react'
import axios from 'axios'

class Usuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            user: {},
            bookings: [],
            tickets: []
        }

        this.HandleUserDetails = this.HandleUserDetails.bind(this);
        this.HandleBookingData = this.HandleBookingData.bind(this);
        this.redirectBooking = this.redirectBooking.bind(this);
        this.renderBookings = this.renderBookings.bind(this);
        this.getTickets = this.getTickets.bind(this);
        this.deleteBooking = this.deleteBooking.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.sleep = this.sleep.bind();

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';

        this.sleep(1000);
        this.componentDidMount();
    }

    async getTickets() {
        const tickets = await axios.get("/api/park/tickets")
            .then((response) => response.data)
            .then((data) => { return data });
        this.setState({ tickets: tickets })
    }

    async HandleUserDetails() {
        var userData = await axios
            .get("/api/park/user")
            .then((response) => { return response.data });

        this.setState({ user: userData });
    }

    async HandleBookingData() {
        var bookings = await axios
            .get("/api/park/book")
            .then((response) => { return response.data });

        this.setState({ bookings: bookings });
    }

    deleteBooking(event, bookId) {
        axios.post("/api/park/book/delete", { id: bookId })
        console.log(event.target.parentElement.parentElement.parentElement.childElementCount)
        if (event.target.parentElement.parentElement.parentElement.childElementCount === 1) {
            this.props.history.push("/Reservas")
        } else {
            event.target.parentElement.parentElement.remove()

        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    renderBookings() {
        try {
            if (this.state.bookings.bookings.length !== 0 && this.state.ready) {
                console.log(this.state.bookings.bookings)
                var bookingsRows = [];
                for (const book of this.state.bookings.bookings) {
                    const ticket = this.state.tickets.find(x => x.id === book.ticket);
                    bookingsRows.push(
                        <tr>
                            <td>{book.id}</td>
                            <td>{ticket.name}</td>
                            <td>{ticket.price}</td>
                            <td>{book.date}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" type="button" onClick={(event) => { this.deleteBooking(event, book.id) }}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    )
                }
                return (
                    <table class="table">
                        <thead>
                            <th scope="col">#</th>
                            <th scope="col">Tiquete Seleccionado</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Fecha</th>
                            <th></th>

                        </thead>
                        <tbody>
                            {bookingsRows}
                        </tbody>
                    </table>

                );
            } else {
                return (
                    <div class="container py-3">
                        <div class="text-secondary text-center pb-3">
                            Aún no tienes Reservas...
                        </div>
                        <div class="text-secondary text-center pb-3">
                            ¿Deseas crear una?
                        </div>
                        <div class="row text-center">
                            <button class="btn btn-success" type="button" onClick={this.redirectBooking}>
                                Crear Reserva
                            </button>
                        </div>
                    </div>

                );
            }
        } catch { }
    }

    redirectBooking() {
        this.props.history.push("/Reservas");
    }

    componentDidMount() {
        this.getTickets();
        this.HandleBookingData();
        this.HandleUserDetails();
        this.setState({ ready: true });
    }

    render() {
        return (
            <div class="pt-5">
                <div class="container bg-light py-3 rounded">
                    <div class="row">
                        <div class="col-6 pe-2">
                            <div class="row text-center pt-3">
                                <h2> Usuario </h2>
                            </div>
                            <div class="container bg-info rounded" style={{ background: 'linear-gradient(to bottom right, #ff1b6b, #45caff)' }}>
                                <div class="row py-3">
                                    <h4 class="text-center py-2 text-light">Detalles de Usuario</h4>
                                    <div class="container bg-light rounded">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <td class="text-center">Nombre de Usuario:</td>
                                                    <td class="text-center">{this.state.user.username}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">Correo Electrónico:</td>
                                                    <td class="text-center">{this.state.user.email}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">Teléfono:</td>
                                                    <td class="text-center">{this.state.user.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td class="text-center">Cumpleaños:</td>
                                                    <td class="text-center">{this.state.user.birthday}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="row py-3 text-center">
                                    <div class="text-center">

                                        <button class="btn btn-danger ms-2" type="button" style={{ backgroundColor: '#ebf4f5', color: 'black' }}>Eliminar Usuario</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 ps-2 ">
                            <div class="row text-center pt-3">
                                <h2 >Reservas</h2>
                            </div>
                            <div class="container bg-info rounded pb-3" style={{ background: 'linear-gradient(to bottom right, #ff1b6b, #45caff)' }}>
                                <div class="row py-2">
                                    <h4 class="text-center py-2 text-light">Reservas Activas</h4>
                                </div>
                                <div class="container bg-light rounded pb-3">
                                    {this.renderBookings()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Usuario