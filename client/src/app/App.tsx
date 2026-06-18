import { AuthProvider } from '../features/auth/auth.context.tsx';
import { AppRouter } from './router.tsx';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
