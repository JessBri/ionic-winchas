import React, { useState } from 'react';
import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar, IonImg, IonThumbnail, IonMenuButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard } from '@ionic/react';
import AuthContext from "../my-context";
import { useHistory } from 'react-router';

import './Home.css';

const Home: React.FC = () => {
  const { authValues, getUserData, queryObjectCollection } = React.useContext(AuthContext);
  const [showLoading, setShowLoading] = React.useState<boolean>(true);
  const history = useHistory();
  const [winchas, setWinchas] = React.useState<any>();

  React.useEffect(() => {
    if (showLoading) {
      (async () => {
        await getUserData();
        setShowLoading(false);
      })();
    }
  }, [getUserData, showLoading]);



  const getVehiclesByUser = async () => {
    setShowLoading(true)
    let res = await queryObjectCollection({ collection: "vehicles" });

    setWinchas(res);
    console.log("WINCHAS", res);
    setShowLoading(false)
  }


  if (showLoading) {
    getVehiclesByUser();
    setShowLoading(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{authValues.userInfo?.typeUser === 'C' ? 'Cliente' : 'Proveedor'}</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={"/wincha"} routerDirection="none">Nuevo</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Lista de Winchas</IonCardTitle>
            <IonCardSubtitle>Esta es la lista de todas mis winchas</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {winchas?.map((doc: any) =>
                <IonItem key={doc.id} routerLink={`/detalleWincha/${doc.id}`}>
                  <IonThumbnail slot="start">
                    <IonImg src={doc.content.foto}></IonImg>
                  </IonThumbnail>
                  <IonLabel>{doc.content.marca} {doc.content.placa}</IonLabel>
                </IonItem>
              )}
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
