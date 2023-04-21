import React from 'react';
import ReactDOM from 'react-dom/client';

import { createStore } from 'polotno/model/store';
import { unstable_setRemoveBackgroundEnabled } from 'polotno/config';
import { Auth0Provider } from '@auth0/auth0-react';
import { createProject, ProjectContext } from './project';
import { SubscriptionProvider } from './subscription-context';

import './index.css';
import App from './App';
import './logger';

if ( window.location.host !== 'studio.polotno.com' )
{
  console.log(
    `%cWelcome to VS Studio!`,
    'background: rgba(54, 213, 67, 1); color: white; padding: 5px;'
  );
}

const store = createStore( { key: 'QfYlR9pbCUx6RM9x8OvA', showCredit: false, } );
window.store = store;
store.addPage();

const project = createProject( { store } );
window.project = project;

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );

const AUTH_DOMAIN = 'polotno-studio.eu.auth0.com';
const PRODUCTION_ID = process.env.REACT_APP_AUTH0_ID;
const LOCAL_ID = process.env.REACT_APP_AUTH0_ID;

const isLocalhost =
  typeof window !== undefined && window.location.href.indexOf( 'localhost' ) >= 0;
const ID = isLocalhost ? LOCAL_ID : PRODUCTION_ID;
const REDIRECT = isLocalhost
  ? 'http://localhost:3000'
  : 'https://studio.polotno.com';

root.render(
  <ProjectContext.Provider value={ project }>
    <Auth0Provider domain={ AUTH_DOMAIN } clientId={ ID } redirectUri={ REDIRECT }>
      <SubscriptionProvider>
        <App store={ store } />
      </SubscriptionProvider>
    </Auth0Provider>
  </ProjectContext.Provider>
);
