import { RouterProvider } from 'react-router-dom';
import router from './routes/Router.tsx';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 70,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '16px',
            padding: '14px 18px',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
            maxWidth: '360px',
          },

          success: {
            icon: '✔',
            style: {
              background: '#ECFDF5',
              color: '#065F46',
              border: '1px solid #A7F3D0',
            },
          },

          error: {
            icon: '✖',
            style: {
              background: '#FEF2F2',
              color: '#991B1B',
              border: '1px solid #FECACA',
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}
