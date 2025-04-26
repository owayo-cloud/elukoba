import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store/Store';


/**setup axios */
axios.defaults.baseURL = "https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rootElement);

root.render(
    <Provider store={store}>
          <RouterProvider router={router}/>
    </Provider>
);
