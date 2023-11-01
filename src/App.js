import logo from './logo.svg';
import './App.css';
import Gallery from './Components/Gallery/Gallery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div >
      <QueryClientProvider client={queryClient} >
          <Gallery></Gallery>
      </QueryClientProvider>
      
    </div>
  );
}

export default App;
