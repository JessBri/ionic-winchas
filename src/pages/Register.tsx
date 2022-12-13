import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonNote } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from '../toast';
import { registerUser } from '../firebaseConfig';
import './Home.css';

const Register: React.FC = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [identificacion, setIdentificacion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const history = useHistory();

    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();

    const validateEmail = (email: string) => {
        return email.match(
            /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        );
    };

    const validate = (ev: Event) => {
        const value = (ev.target as HTMLInputElement).value;

        setIsValid(undefined);

        if (value === '') return;

        validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
    };

    const markTouched = () => {
        setIsTouched(true);
    };

    async function register() {
        console.log(username, password, cpassword);
        if (password !== cpassword) {
            return toast('Las contraseñas no coinciden')
        }
        if (username.trim() === '' || password.trim() === '') {
            return toast('Correo electrónico y contraseña son requeridos')
        }

        const res = await registerUser(username, password, nombre, apellido, identificacion, telefono, direccion)
        if (!res) {
            toast('Ha ocurrido un error en el registro')
            console.log('ERROR Register')
        } else {
            toast('Has sido registrado exitosamente')
            console.log('You have Register in!')
            history.push('/home')
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Registro</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonItem>
                    <IonLabel position="floating">Nombre</IonLabel>
                    <IonInput required onIonChange={(e: any) => setNombre(e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Apellido</IonLabel>
                    <IonInput onIonChange={(e: any) => setApellido(e.target.value)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Identificación</IonLabel>
                    <IonInput onIonChange={(e: any) => setIdentificacion(e.target.value)} />
                </IonItem>
                <IonItem className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
                    <IonLabel position="floating">Correo electrónico</IonLabel>
                    <IonInput type="email" onIonChange={(e: any) => setUsername(e.target.value)} onIonInput={(event) => validate(event)} onIonBlur={() => markTouched()} />
                    <IonNote slot="error">Invalid email</IonNote>
                </IonItem >
                <IonItem>
                    <IonLabel position="floating">Teléfono</IonLabel>
                    <IonInput onIonChange={(e: any) => setTelefono(e.target.value)} />
                </IonItem >
                <IonItem>
                    <IonLabel position="floating">Dirección</IonLabel>
                    <IonInput onIonChange={(e: any) => setDireccion(e.target.value)} />
                </IonItem >
                <IonItem>
                    <IonLabel position="floating">Contraseña</IonLabel>
                    <IonInput type='password' onIonChange={(e: any) => setPassword(e.target.value)} />
                </IonItem >
                <IonItem>
                    <IonLabel position="floating">Confimar Contraseña</IonLabel>
                    <IonInput type='password' onIonChange={(e: any) => setCPassword(e.target.value)} />
                </IonItem >
                <IonButton className='login-button' expand='full' onClick={register}>Registrarme</IonButton>
                <p className='ion-text-center'>¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
            </IonContent>
        </IonPage>
    );
};

export default Register;
