import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API_ENDPOINT = publicRuntimeConfig.NEXT_PUBLIC_API_ENDPOINT;
