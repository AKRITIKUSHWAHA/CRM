import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CrmProvider } from './context/CrmContext';
import { ErpProvider } from './context/ErpContext';
import { HrProvider } from './context/HrContext';
import { SupportProvider } from './context/SupportContext';
import { OalProvider } from './context/OalContext';
import { AppRoutes } from './routes/AppRoutes';

import './styles/variables.css';
import './styles/global.css';
import './styles/utilities.css';
import './styles/components.css';
import './styles/responsive.css';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <CrmProvider>
              <ErpProvider>
                <HrProvider>
                  <SupportProvider>
                    <OalProvider>
                      <AppRoutes />
                    </OalProvider>
                  </SupportProvider>
                </HrProvider>
              </ErpProvider>
            </CrmProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
