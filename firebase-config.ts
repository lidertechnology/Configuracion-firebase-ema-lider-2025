// src/app/firebase/config.ts

import { environment } from '../../environments/environment';

/**
 * 1. INICIALIZACIÓN DE LA APLICACIÓN FIREBASE
 * Punto de entrada principal para todos los servicios
 */
import { initializeApp } from 'firebase/app';

// Configuración desde variables de entorno
const firebaseConfig = environment.firebaseConfig;

// Inicializar Firebase (aplicación principal)
// Beneficio: Centraliza la configuración y permite compartir la misma instancia entre servicios
export const app = initializeApp(firebaseConfig);
console.log('Firebase App Initialized:', app.name);

/**
 * 2. FIRESTORE - Base de datos NoSQL en tiempo real
 * Almacenamiento de datos estructurados con sincronización en tiempo real
 */
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentSingleTabManager 
} from 'firebase/firestore';

// Beneficio: Permite trabajar sin conexión y sincroniza automáticamente al reconectar
export const firestore = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

/**
 * 3. AUTENTICACIÓN - Sistema de gestión de usuarios
 * Identificación y gestión de sesiones de usuarios
 */
import { getAuth } from 'firebase/auth';

// Beneficio: Múltiples métodos de autenticación (email/password, redes sociales, etc.)
export const auth = getAuth(app);

/**
 * 4. ALMACENAMIENTO - Gestión de archivos
 * Almacenamiento de archivos en la nube optimizado para contenido multimedia
 */
import { getStorage } from 'firebase/storage';

// Beneficio: Gestión eficiente de contenido multimedia con control de permisos
export const storage = getStorage(app);

/**
 * 5. MENSAJERÍA - Notificaciones push
 * Sistema de comunicación con usuarios cuando la app está cerrada
 */
import { getMessaging, getToken } from "firebase/messaging";

// Beneficio: Comunicación en tiempo real con los usuarios incluso cuando la app está cerrada
export const messaging = getMessaging(app);

// Solicitar permiso y obtener token para notificaciones push
// Beneficio: Implementación robusta con manejo de errores
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: environment.vapidKey
      });
      console.log('Token FCM:', token);
      return token;
    } else {
      console.log('Permiso de notificación no concedido');
      return null;
    }
  } catch (error) {
    console.error('Error al solicitar permiso:', error);
    return null;
  }
};

/**
 * 6. ANALYTICS - Análisis de comportamiento
 * Seguimiento y análisis del uso de la aplicación
 */
import { getAnalytics } from "firebase/analytics";

// Beneficio: Métricas detalladas de uso para mejorar la experiencia del usuario
export const analytics = getAnalytics(app);

/**
 * 7. CLOUD FUNCTIONS - Código serverless
 * Ejecución de código en la nube sin gestionar servidores
 */
import { getFunctions } from "firebase/functions";

// Beneficio: Ejecutar lógica en la nube sin necesidad de gestionar servidores
export const functions = getFunctions(app);

/**
 * 8. PERFORMANCE - Monitoreo de rendimiento
 * Análisis y optimización del rendimiento de la aplicación
 */
import { getPerformance } from "firebase/performance";

// Beneficio: Identifica cuellos de botella y optimiza la velocidad de la aplicación
export const performance = getPerformance(app);

/**
 * 9. REMOTE CONFIG - Configuración dinámica
 * Modificación del comportamiento de la app sin actualizaciones
 */
import { getRemoteConfig } from "firebase/remote-config";

// Beneficio: Modificar comportamiento de la app sin necesidad de actualizaciones
export const remoteConfig = getRemoteConfig(app);

/**
 * 10. INSTALLATIONS - Gestión de instalaciones
 * Identificación única de dispositivos e instalaciones
 */
import { getInstallations } from "firebase/installations";

// Beneficio: Identificación única de dispositivos para análisis y mensajería
export const installations = getInstallations(app);

/**
 * 11. APP CHECK - Protección contra uso indebido
 * Verificación de que las solicitudes provienen de tu aplicación legítima
 */
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Beneficio: Verifica que las solicitudes provienen de tu app legítima
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('tu-clave-recaptcha'),
  isTokenAutoRefreshEnabled: true
});
