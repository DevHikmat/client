import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@ant-design/v5-patch-for-react-19';
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MessageProvider } from './context/MessageContext.tsx';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <MessageProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MessageProvider>
    </QueryClientProvider>
)
