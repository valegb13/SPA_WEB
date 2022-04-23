import React from 'react'
import Container from '@mui/material/Container'
import './estilos.css'
import axios from 'axios'


class Reservas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            ticket: ""
        };
        this.tickets = []



        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTicketChange = this.handleTicketChange.bind(this);
        this.createSelectOptions = this.createSelectOptions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTickets = this.getTickets.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        this.componentDidMount();
    }

    handleDateChange(event) { this.setState({ date: event.target.value }); }
    handleTicketChange(event) { this.setState({ ticket: event.target.value }); }

    async getTickets() {
        this.tickets = await axios.get("/api/park/tickets")
            .then((response) => response.data)
            .then((data) => { return data });
    }

    componentDidMount() {
        this.getTickets();
    }

    createSelectOptions() {
        let items = [];
        for (const ticket of this.tickets) {
            items.push(<option key={ticket.id} value={ticket.id}>{ticket.name} ($ {ticket.price})</option>);
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return items;
    }

    handleSubmit() {
        if (
            this.state.username === '' || this.state.email === '' ||
            this.state.password === '' || this.state.phone === '' ||
            this.state.birthday === ''
        ) {
            return;
        }

        axios.post("/api/park/book/create", this.state)
            .then((response) => response.data)
            .then((data) => this.props.history.push("/"));
    }

    render() {
        return (
            <div class="pt-5">
                <h1 class="text-center">¡Reserva ya con nosotros!</h1>

                <Container maxWidth="xs" className="Container col-md-offset-5 bg-info rounded text-white" style={{ background: 'linear-gradient(to bottom right, #ff1b6b, #45caff)' }}>
                    <div className="Cool" style={{ background: 'linear-gradient(to bottom right, #ff1b6b, #45caff)' }}>
                        <form>
                            <div class="form-row text-center py-3">
                                <div class="form-group text-center bg-indigo rounded">
                                    <label for="inputdateres4">Fecha</label>
                                    <input type="date" class="form-control" id="inputdateres4" onChange={this.handleDateChange} />
                                </div>
                                <div class="form-group text-center bg-indigo rounded">
                                    <label for="inputTicket">Tipo de tiquete</label>
                                    <select id="inputTicket" class="form-control" onChange={this.handleTicketChange}>
                                        <option value="" selected>Elija una opción</option>
                                        {this.createSelectOptions()}
                                    </select>
                                </div>
                                <div class="form-check bg-indigo rounded">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        Acepto los términos y condiciones
                                    </label>
                                </div>
                                <div class="container text-center my-3 container-fluid">
                                    <button type="button" class="btn btn-warning col-md-8 ml-auto float-center" style={{ backgroundColor: 'white', color: 'black' }} onClick={this.handleSubmit}>¡Listo!</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Reservas
