import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonLabel, IonLoading, IonCard, IonImg, IonButtons, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { toast } from '../toast';
import AuthContext from '../my-context';
import WinchaProps from '../components/WinchaProps';
import './Home.css';
import { arrowBack, camera } from 'ionicons/icons';

const CreateWincha: React.FC<WinchaProps> = () => {
    const { addObjectToCollection } = React.useContext(AuthContext);
    const [busy, setBusy] = useState<boolean>(false);
    const history = useHistory();
    const [item, setItem] = useState<WinchaProps>({
        placa: '',
        marca: '',
        tipo: '',
        anio: '',
        altura: 0,
        largo: 0,
        peso: 0,
        latitude: 0,
        longitud: 0,
        foto: '',
        estado: true,
    });


    const addLocation = async () => {
        const position = await Geolocation.getCurrentPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("LOCATION", position);
        return setItem({
            ...item,
            longitud: longitude,
            latitude: latitude
        })
    }

    const takePhoto = async () => {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera,
            quality: 100
        });
        const photo = `data:image/jpeg;base64,${cameraPhoto.base64String}`;
        return setItem({
            ...item,
            foto: photo
        });
    }

    const createVehicle = async () => {
        setBusy(true)
        let res = await addObjectToCollection({ collection: "vehicles", objectData: item });
        if (!res) {
            toast('Ha ocurrido un error')
        } else {
            toast('La Wincha se ha registrado exitosamente!')
            history.push('/home');
        }
        setBusy(false)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton routerLink={"/home"}><IonIcon slot='icon-only' icon={arrowBack}></IonIcon></IonButton>
                    </IonButtons>
                    <IonTitle>Crear Vehiculo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
                <IonLoading isOpen={busy} />
                <IonItem>
                    <IonLabel position="floating">Placa</IonLabel>
                    <IonInput required onIonChange={(e: any) => setItem({ ...item, placa: e.target.value })} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Marca</IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, marca: e.target.value })} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Tipo</IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, tipo: e.target.value })} />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Año</IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, anio: e.target.value })} />
                </IonItem >
                <IonItem>
                    <IonLabel position="floating">Altura(m)</IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, altura: e.target.value })} />
                </IonItem >
                <IonItem>
                    <IonLabel position="floating">Largo(m)</IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, largo: e.target.value })} />
                </IonItem >
                <IonItem>
                    <IonLabel position="floating">Peso(kg)</IonLabel>
                    <IonInput onIonChange={(e: any) => setItem({ ...item, peso: e.target.value })} />
                </IonItem >
                <IonItem>
                    <IonCard>
                        {item.foto ? (<IonImg src={item.foto}></IonImg>) : (
                            <IonLabel> <IonIcon icon={camera}></IonIcon></IonLabel>
                        )}

                        <IonButton onClick={() => takePhoto()}>Tomar foto</IonButton>
                    </IonCard>
                </IonItem >
                <IonItem>
                    <IonCard>
                        <IonLabel>Longitud: {item.longitud}</IonLabel>
                        <IonLabel>Latitude: {item.latitude}</IonLabel>
                        <IonButton onClick={() => addLocation()}> Geolocalizacion</IonButton>
                    </IonCard>
                </IonItem >
                <IonButton className='login-button' expand='full' onClick={() => createVehicle()}>Guardar</IonButton>

            </IonContent>
        </IonPage>
    );
};

export default CreateWincha;
