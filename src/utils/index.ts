import axios from "axios";
import {notification} from 'antd';

export const getRequest = (url: string) => axios.get(url, { headers: { authorization: `Bearer ${localStorage.getItem('token')}`}})
export const postRequest = (url: string, payload: any) => axios.post(url, payload, { headers: { authorization: `Bearer ${localStorage.getItem('token')}`}})
export const updateRequest = (url: string, payload: any) => axios.patch(url, payload, { headers: { authorization: `Bearer ${localStorage.getItem('token')}`}})
export const deleteRequest = (url: string) => axios.delete(url, { headers: { authorization: `Bearer ${localStorage.getItem('token')}`}})


export const openNotification = (message: string, description: string,) => {
  notification.error({message, description});
};