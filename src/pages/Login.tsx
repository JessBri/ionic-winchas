import { IonButton, IonContent, IonItem, IonPage, IonTitle, IonToolbar, IonInput, IonImg, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';
import { toast } from '../toast';
import './Home.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    async function login() {
        const res = await loginUser(username, password)
        if (!res) {
            toast('Ha ocurrido un error')
        } else {
            toast('Has iniciado sesion!')
            history.push('/home')
        }
    }

    return (
        <IonPage>
            <IonContent className='ion-padding'>
                <div className='ion-text-center'>
                    <IonImg src="assets/wincha.webp" />

                </div>
                <div className='ion-text-center title'>
                    <IonLabel className=''>PROVEEDOR DE SERVICIOS</IonLabel>
                </div>
                <div>
                    <IonItem>
                        <IonLabel position="floating">Correo electrónico</IonLabel>
                        <IonInput onIonChange={(e: any) => setUsername(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Contraseña</IonLabel>
                        <IonInput type='password' onIonChange={(e: any) => setPassword(e.target.value)} />
                    </IonItem>
                    <IonButton className='ion-margin-top login-button' expand='full' onClick={login}>Iniciar sesión</IonButton>
                </div>
                <div>
                    <p className='ion-text-center'>
                        ¿Aún no tienes cuenta? <Link to="/register">Regístrate</Link>
                    </p>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default Login;
