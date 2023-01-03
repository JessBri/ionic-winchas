import React, { useState } from 'react';
import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonPage, IonTitle, IonToolbar, IonImg, IonThumbnail, IonMenuButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCard } from '@ionic/react';
import AuthContext from "../my-context";
import { useHistory } from 'react-router';

import './Home.css';

const Home: React.FC = () => {
  const { authValues, getUserData, queryObjectCollection, queryObjectAllVehicles } = React.useContext(AuthContext);
  const [showLoading, setShowLoading] = React.useState<boolean>(true);
  const [showBusy, setShowBusy] = React.useState<boolean>(false);
  const history = useHistory();
  const [winchas, setWinchas] = React.useState<any>();
  const [user, setUser] = React.useState<boolean>();

  React.useEffect(() => {
    if (showLoading) {
      (async () => {
        let user = await getUserData();
        setUser(user);
        setShowLoading(false);
      })();

    }

  }, [getUserData, showLoading]);





  const getVehiclesByUser = async () => {
    setShowBusy(true);
    let res = await queryObjectCollection({ collection: "vehicles" });

    setWinchas(res);
    console.log("WINCHAS", res);
    setShowBusy(false);
  }


  const getAllVehicles = async () => {
    setShowBusy(true);
    let res = await queryObjectAllVehicles({ collection: "vehicles" });

    setWinchas(res);
    console.log("WINCHAS", res);
    setShowBusy(false);
  }




  if (!showLoading && user) {
    console.log(authValues.userInfo);
    if (authValues.userInfo?.perfil === 'C') {
      console.log("Cliente");
      getAllVehicles();
    } else {
      console.log("Proveedor");
      getVehiclesByUser();
    }

    setUser(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{authValues.userInfo?.perfil === 'C' ? 'Cliente' : 'Proveedor'}</IonTitle>
          {authValues.userInfo?.perfil === 'C' ? (<IonButtons slot="end"></IonButtons>) : (
            <IonButtons slot="end">
              <IonButton routerLink={"/wincha"} routerDirection="none">Nuevo</IonButton>
            </IonButtons>
          )}

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading message="Consultando datos" isOpen={showBusy} />
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Lista de Winchas</IonCardTitle>
            <IonCardSubtitle>{authValues.userInfo?.perfil === 'C' ? 'Esta es la lista de winchas disponibles' : 'Esta es la lista de todas mis winchas'}</IonCardSubtitle>
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
