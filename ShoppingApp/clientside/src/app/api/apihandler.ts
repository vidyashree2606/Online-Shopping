import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { store } from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;
const responseBody = (response: AxiosResponse) => response.data;


axios.interceptors.response.use(async response => {
    await sleep();
    return response;
},(error:AxiosError)=>{
    // console.log('Caught with axios interceptor');
    const {data,status} = error.response!;
    switch (status) {
        case 400:
            if(data.errors){
                const modelStateError:string[] = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateError.push(data.errors[key]);
                    }
                }
                throw modelStateError.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title || 'unauthorized');
            break;
        case 500:
            // toast.error(data.title);
            history.push({
                pathname: '/server-error',
                state: {error:data}
            });
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

// axios.interceptors.request.use(config => {
//     const token = store.getState().account.user?.token;
//     if (token) {
//         if (token) config.headers.Authorization =  `Bearer ${token}`;
//         return config;
//     }
// }
// )
// function responseBodyFunction(response:AxiosResponse){
//     return response.data;
// }

const requests = {
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url:string,body:{}) => axios.post(url,body).then(responseBody),
    put: (url:string,body:{}) => axios.put(url,body).then(responseBody),
    delete: (url:string) => axios.delete(url).then(responseBody),
};

const Catalog = {
    list:()=>requests.get('product'),
    details: (id:number) => requests.get(`product/${id}`),

}

const TestErrors = {
    get400Error: () => requests.get("error/bad-request"),
    get401Error: () => requests.get("error/unauthorized"),
    get404Error: () => requests.get("error/not-found"),
    get500Error: () => requests.get("error/server-error"),
    getValidationError: () => requests.get("error/validation-error"),
}

const Cart = {
    get: () => requests.get('cart'),
    addItem: (productId:number,quantity=1) => requests.post(`cart?productId=${productId}&quantity=${quantity}`,{}),
    removeItem: (productId:number,quantity=1) => requests.delete(`cart?productId=${productId}&quantity=${quantity}`)
    
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
}

const apihandler = {
    Catalog,
    TestErrors,
    Cart,Account
}

export default apihandler;