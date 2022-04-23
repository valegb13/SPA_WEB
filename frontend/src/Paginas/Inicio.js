import React from 'react'
import './product.css'
import { Link } from 'react-router-dom'
import { updateText } from '../Navegacion/Navbar'

const Inicio = () => {
    updateText("a")
    return (
        <div>

            <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center" style={{ background: '#a9ff68' }}>
                <div class="col-md-5 p-lg-5 mx-auto my-5">
                    <h1 class="display-4 font-weight-normal" >¡Únete a la diversión!</h1>
                    <p class="lead font-weight-normal">Registrate ya para obtener un tiquete gratis el dia de tu cumple.</p>
                    <Link class="btn btn-outline-secondary btn-lg" to="/Registro">Registrate aquí</Link>
                </div>
                <div class="product-device box-shadow d-none d-md-block"></div>
                <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
            </div>
            <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center" style={{ background: '#FE6684', color: 'white' }}>
                <h2 class="display-5">Nuestros Tiquetes</h2>
            </div>
            <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3" >
                <div class=" mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden" style={{ background: '#C0C0C0' }}>
                    <div class="my-3 p-3">
                        <h2 class="display-5">Tiquete Plata</h2>
                        <p class="lead2" style={{ fontSize: '30px' }}>Precio: $29.99</p>
                        <p class="lead">Adentrate a la aventura con nuestro tiquete oro, este tiquete solo es válido para una persona, diviertete explorando las atracciones familiares e infantiles.</p>
                        <p class="lead2" style={{ fontSize: '11px' }}>A tener en cuenta: Este tiquete solo permite entrar una vez a una de nuestras atracciones de alto impacto</p>
                    </div>
                    <div class=" box-shadow mx-auto" style={{ width: '80%', height: '300px', backgroundImage: 'url("https://www.etapainfantil.com/wp-content/uploads/2015/08/Parque-de-atracciones-PortAventura-S%C3%A9samo-Aventura-e1440927396351.jpg")' }}></div>
                </div>

                <div class="mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-black overflow-hidden" style={{ background: '#EABE3F' }} >
                    <div class="my-3 py-3">
                        <h2 class="display-5">Tiquete Oro</h2>
                        <p class="lead2" style={{ fontSize: '30px' }}>Precio: $49.99</p>
                        <p class="lead">¡Para nuestros clientes amantes de la adenalina! Disfruta de acceso ilimitado a todas nuestras atracciones. Tour exclusivo por nuestra mansión embrujada.</p>
                        <p class="lead2" style={{ fontSize: '11px' }}>A tener en cuenta: No apto para cardiacos ni pussys</p>

                    </div>
                    <div class=" box-shadow mx-auto" style={{ width: '80%', height: '300px', backgroundImage: 'url("http://www.turismito.com/wp-content/uploads/2012/11/tn_rollerstaircase2.jpg")' }}></div>
                </div>
            </div>

            <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                <div class="mr-md-3 pt-3 px-10 pt-md-15 px-md-5 text-center overflow-hidden" style={{ background: '#4c2882' }}>
                    <div class="my-3 p-3">
                        <h2 class="display-5" style={{ color: 'white' }}>Tiquete diamante</h2>
                        <p class="lead2" style={{ fontSize: '30px', color: 'white' }}>Precio: $119.99</p>
                        <p class="lead" style={{ color: 'white' }}>¿Salida en familia? ¡No te preocupes! Tenemos para ustedes acceso ilimitado a todos las atracciones. Debido a la temática elegida anualmente por nuestros visitantes,
                            los grupos que adquieran este ticket serán guiado por uno de nuestros personajes de Shrek, ¡Todos podrán viajar en el carruaje cebolla por el parque!</p>
                        <p class="lead2" style={{ fontSize: '11px', color: 'white' }}>A tener en cuenta: Grupos de máximo 4 personas, para personas extra se debe pagar el tiquete oro.</p>
                    </div>
                    <div class=" box-shadow mx-right " style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat center', height: '400px', boxSizing: 'content-box', backgroundImage: 'url("https://elsouvenir.com/wp-content/uploads/2019/04/shrek-far-far-away-adventure1.jpg")' }}></div>
                </div>

            </div>

        </div>

    )
}

export default Inicio
