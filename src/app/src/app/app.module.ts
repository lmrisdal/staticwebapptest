import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';




import {
    IPublicClientApplication,
    PublicClientApplication,
    InteractionType,
} from '@azure/msal-browser';
import {
    MsalGuard,
    MsalBroadcastService,
    MsalModule,
    MsalService,
    MSAL_GUARD_CONFIG,
    MSAL_INSTANCE,
    MsalGuardConfiguration,
    MsalRedirectComponent,
} from '@azure/msal-angular';
import { msalConfig } from './auth-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavMenuComponent } from './modules/nav-menu/nav-menu.component';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { StationsComponent } from './modules/stations/stations/stations.component';

/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */
export function MSALInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication(msalConfig);
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return {
        interactionType: InteractionType.Redirect,
        loginFailedRoute: '/error'
    };
}

@NgModule({
    declarations: [AppComponent, NavMenuComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MsalModule,
        BrowserAnimationsModule],
    providers: [
        {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory,
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory,
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
