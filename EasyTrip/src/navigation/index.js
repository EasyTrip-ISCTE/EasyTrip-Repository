import React from 'react';
import { AuthProvider } from '../components/AuthProvider';
import App from './App';

const Providers = () => {
    return(
        <AuthProvider>
            <App/>
        </AuthProvider>
    );
}

export default Providers;