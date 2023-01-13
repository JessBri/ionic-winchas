import React, { useState } from 'react';
import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonLoading, IonPage, IonTitle, IonToolbar, IonImg, IonThumbnail, IonMenuButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard, IonIcon, IonList, IonNavLink, IonModal, IonInput } from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';
import AuthContext from "../my-context";
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { trash, pencil, arrowBack, navigate } from 'ionicons/icons';


import './Home.css';
import { toast } from '../toast';

function DetalleWincha() {
    const { authValues, queryObjectById, editObjectById, removeObjectFromCollection } = React.useContext(AuthContext);
    const params = useParams<{ id: string }>();
    const [showLoading, setShowLoading] = React.useState<boolean>(true);
    const [showBusy, setShowBusy] = React.useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [wincha, setWincha] = React.useState<any>();
    const history = useHistory();
    const [item, setItem] = useState<any>({
        latitude: 0,
        longitud: 0,
    });
    const [price, setPrice] = useState<any>({
        precioLevantamiento: 0,
        precioKilometro: 0,
    });
    console.log(params);



    const getVehicleById = async () => {
        let res = await queryObjectById({ collection: "vehicles", id: params.id });

        setWincha(res);
        console.log("WINCHAS", res);
    }

    const deleteVehicleById = async () => {
        setShowLoading(true)
        let res = await removeObjectFromCollection({ collection: "vehicles", id: params.id });

        if (res) {
            toast('La wincha se ha eliminado exitosamente')
            history.push('/home')
        } else {
            toast('Ha ocurrido un error')
        }
        setShowLoading(false)
    }

    const addLocation = async () => {
        const position = await Geolocation.getCurrentPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("LOCATION", position);
        return setItem({
            longitud: longitude,
            latitude: latitude
        })
    }

    function cancel() {
        setIsOpen(false);
    }

    const reservarVehicle = async () => {

    }

    const addPrice = async () => {
        setShowBusy(true)
        console.log('EDIT', price);
        wincha.price = price;
        console.log('EDIT', wincha);
        let res = await editObjectById({ collection: "vehicles", id: params.id, obj: wincha });
        if (!res) {
            toast('Ha ocurrido un error')
        } else {
            toast('El precio se ha actualizado exitosamente!')
            setIsOpen(false);
        }
        setShowBusy(false)
    }

    const newLocation = async () => {
        setShowBusy(true)
        addLocation();
        console.log('EDIT', item);
        wincha.content.latitude = item.latitude;
        wincha.content.longitud = item.longitud;
        console.log('EDIT', wincha);
        let res = await editObjectById({ collection: "vehicles", id: params.id, obj: wincha });
        if (!res) {
            toast('Ha ocurrido un error')
        } else {
            toast('La localizacion se ha actualizado exitosamente!')
        }
        setShowBusy(false)
    }

    if (showLoading) {
        getVehicleById();
        addLocation();
        setShowLoading(false);

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton routerLink={"/home"}><IonIcon slot='icon-only' icon={arrowBack}></IonIcon></IonButton>
                    </IonButtons>
                    <IonTitle>Detalle Wincha</IonTitle>

                    {authValues.userInfo?.perfil === 'C' ? (<IonButtons slot="end">
                        <IonButton className='login-button' expand='full' onClick={() => reservarVehicle()}>Solicitar</IonButton>
                    </IonButtons>) : (
                        <IonButtons slot="end"> <IonButton routerLink={`/editWincha/${params.id}`}><IonIcon slot='icon-only' icon={pencil}></IonIcon></IonButton>
                            <IonButton onClick={() => deleteVehicleById()}><IonIcon slot='icon-only' icon={trash}></IonIcon></IonButton>
                        </IonButtons>
                    )}


                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonLoading isOpen={showBusy} />
                {wincha ? (
                    <div>
                        <IonCard>
                            <IonImg src={wincha.content.foto}></IonImg>
                            <IonCardHeader>
                                <IonCardTitle>{wincha.content.marca} {wincha.content.placa}</IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                <IonList>
                                    <IonItem>
                                        <IonLabel>Placa: {wincha.content.placa}</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>Marca: {wincha.content.marca}</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>Tipo: {wincha.content.tipo}</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>Año: {wincha.content.anio}</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>Altura(m): {wincha.content.altura}</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>Largo(m): {wincha.content.largo}</IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>Peso(kg): {wincha.content.peso}</IonLabel>
                                    </IonItem>
                                </IonList>





                            </IonCardContent>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Geolocalizacion</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonItem>
                                    <IonLabel>Latitude: {wincha.content.latitude}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Longitude: {wincha.content.longitud}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    {authValues.userInfo?.perfil === 'C' ? (<a href={`https://www.google.com/maps/dir/${item.latitude},${item.longitud}/${wincha.content.latitude},${wincha.content.longitud}`} target="_blank" rel="noreferrer"><IonIcon icon={navigate}></IonIcon> Ver ruta</a>) : (
                                        <a href={`https://maps.google.com/?q=${wincha.content.latitude},${wincha.content.longitud}`} target="_blank" rel="noreferrer">Ver ubicación</a>
                                    )}
                                </IonItem>
                                {authValues.userInfo?.perfil === 'P' ? (<IonButton className='login-button' expand='full' onClick={() => newLocation()}>Actualizar localizacion</IonButton>
                                ) : (<></>)}
                            </IonCardContent>
                        </IonCard>
                        {wincha.price ? (<IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Precio</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonItem>
                                    <IonLabel>Precio por levantamiento: ${wincha.price.precioLevantamiento}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Precio por kilometro: ${wincha.price.precioKilometro}</IonLabel>
                                </IonItem>
                                {authValues.userInfo?.perfil === 'P' ? (<IonButton className='login-button' expand='full' onClick={() => setIsOpen(true)}>Actualizar Precio</IonButton>
                                ) : (<IonButton className='login-button' expand='full' onClick={() => reservarVehicle()}>Solicitar</IonButton>
                                )}
                            </IonCardContent>
                        </IonCard>) : (
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Precio</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonItem>
                                        <IonLabel>No ha registrado un precio</IonLabel>
                                    </IonItem>
                                    {authValues.userInfo?.perfil === 'P' ? (<IonButton className='login-button' expand='full' onClick={() => setIsOpen(true)}>Agregar Precio</IonButton>
                                    ) : (<IonButton className='login-button' expand='full' onClick={() => reservarVehicle()}>Solicitar</IonButton>)}
                                </IonCardContent>
                            </IonCard>
                        )}
                        <IonModal isOpen={isOpen}>
                            <IonHeader>
                                <IonToolbar>
                                    <IonButtons slot="start">
                                        <IonButton onClick={() => cancel()}>Cancel</IonButton>
                                    </IonButtons>
                                    <IonTitle>Precio</IonTitle>
                                </IonToolbar>
                            </IonHeader>
                            <IonContent className="ion-padding">
                                <IonItem>
                                    <IonLabel position="floating">Precio por levantamiento($)</IonLabel>
                                    <IonInput required onIonChange={(e: any) => setPrice({ ...price, precioLevantamiento: e.target.value })} />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Precio por kilometro($)</IonLabel>
                                    <IonInput onIonChange={(e: any) => setPrice({ ...price, precioKilometro: e.target.value })} />
                                </IonItem>
                                <IonButton className='login-button' expand='full' onClick={() => addPrice()}>Guardar</IonButton>

                            </IonContent>
                        </IonModal>
                    </div>
                ) : (
                    <IonLabel>No existen datos</IonLabel>
                )}


            </IonContent>
        </IonPage>
    );
};

export default DetalleWincha;
