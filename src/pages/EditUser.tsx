import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonNote, IonModal, IonButtons, IonLoading, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from '../toast';
import UserProps from '../components/UserProps';
import AuthContext from '../my-context';
import './Home.css';
import { arrowBack } from 'ionicons/icons';

const EditUser: React.FC<UserProps> = () => {
    const { authValues, createAccount, editObjectById } = React.useContext(AuthContext);
    const [busy, setBusy] = useState<boolean>(true)
    const [loading, setShowLoading] = useState<boolean>(false)
    const [item, setItem] = useState<UserProps>({
        apellido: '',
        direccion: '',
        identificacion: 0,
        telefono: 0,
        nombre: '',
        perfil: '',
        imagen: ''
    });
    const history = useHistory();

    if (busy) {
        setItem(authValues.userInfo);
        setBusy(false);
    }



    const actualizar = async () => {
        setShowLoading(true)
        let res = await editObjectById({ collection: "usuarios", id: authValues.user.multiFactor.user.uid, obj: item });
        if (!res) {
            toast('Ha ocurrido un error')
        } else {
            toast('Los datos se han actualizado exitosamente!')
            history.push("/home");
        }
        setShowLoading(false)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton routerLink={"/home"}><IonIcon slot='icon-only' icon={arrowBack}></IonIcon></IonButton>
                    </IonButtons>
                    <IonTitle>Mis Datos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonLoading isOpen={loading} />

                <IonItem>
                    <IonLabel position="floating">Nombre</IonLabel>
                    <IonInput required onIonChange={(e: any) => setItem({ ...item, nombre: e.target.value })} value={item.nombre} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Apellido</IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, apellido: e.target.value })} value={item.apellido} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Identificaci??n</IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, identificacion: e.target.value })} value={item.identificacion} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Tel??fono</IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, telefono: e.target.value })} value={item.telefono} />
                </IonItem >
                <IonItem>
                    <IonLabel position="floating">Direcci??n</IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, direccion: e.target.value })} value={item.direccion} />
                </IonItem >
                <IonButton className='login-button' expand='full' onClick={actualizar}>Actualizar datos</IonButton>

            </IonContent>
        </IonPage>
    );
};

export default EditUser;
