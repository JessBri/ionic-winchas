import React from 'react';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import AuthContext from "../my-context";
import { useHistory } from 'react-router';

export const Example = () => {
    const { logout } = React.useContext(AuthContext);
    const history = useHistory();

    const logoutUser = async () => {
        await logout();
        history.push('/')
    }
    return (
        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu Content</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonList>
                        <IonMenuToggle auto-hide="false">
                            <IonItem button routerLink={"/home"} routerDirection="none">
                                <IonLabel>Home</IonLabel>
                            </IonItem>
                            <IonItem button onClick={() => logoutUser()}>
                                <IonLabel>Cerrar sesión</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    Tap the button in the toolbar to open the menu.
                </IonContent>
            </IonPage>
        </>
    );
};