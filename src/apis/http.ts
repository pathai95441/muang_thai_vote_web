
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_ENDPOINT } from '@/config';
import { ACCESS_TOKEN_COOKIE } from '@/const';

const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN_COOKIE);
};

const endpoint = API_ENDPOINT as string;

var instance = axios.create({
  baseURL: endpoint || 'http://192.168.1.6:8080',
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
    'Content-Type': 'application/json'
  }
});

const UpdateInstanceAuthorization = (token: string) => {
    instance = axios.create({
        baseURL: endpoint || 'http://192.168.1.6:8080',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
    });
}

export { instance, UpdateInstanceAuthorization };
