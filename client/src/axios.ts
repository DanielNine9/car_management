import axios from "axios";
import { useSelector } from "react-redux";

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
});
// instance.interceptors.request.use((config) => {
//     const accessToken = useSelector((state: any) => state?.auth?.login?.currentUser?.access_token)
//     if (accessToken) {
//         // Nếu có access token, thêm vào header của request
//         config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return accessToken
// })


// instance.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response.data;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
// });

export default instance