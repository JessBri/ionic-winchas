import React, { useState } from 'react';
import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonLoading, IonPage, IonTitle, IonToolbar, IonImg, IonThumbnail, IonMenuButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard, IonIcon, IonList, IonNavLink } from '@ionic/react';
import AuthContext from "../my-context";
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { trash, pencil, arrowBack } from 'ionicons/icons';

import './Home.css';
import { toast } from '../toast';

function DetalleWincha() {
    const { queryObjectById, removeObjectFromCollection } = React.useContext(AuthContext);
    const params = useParams<{ id: string }>();
    const [showLoading, setShowLoading] = React.useState<boolean>(true);
    const [wincha, setWincha] = React.useState<any>();
    const history = useHistory();
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

    if (showLoading) {
        getVehicleById();
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
                    <IonButtons slot="end">
                        <IonButton routerLink={`/editWincha/${params.id}`}><IonIcon slot='icon-only' icon={pencil}></IonIcon></IonButton>

                        <IonButton onClick={() => deleteVehicleById()}><IonIcon slot='icon-only' icon={trash}></IonIcon></IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {wincha ? (
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
                                <IonItem>
                                    <IonLabel>Latitude: {wincha.content.latitude}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Longitude: {wincha.content.longitud}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <a href={`https://maps.google.com/?q=${wincha.content.latitude},${wincha.content.longitud}`} target="_blank" rel="noreferrer">Ir a Google </a>
                                </IonItem>
                            </IonList>
                        </IonCardContent>
                    </IonCard>
                ) : (
                    <IonLabel>No existen datos</IonLabel>
                )}


            </IonContent>
        </IonPage>
    );
};

export default DetalleWincha;
