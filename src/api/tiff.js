import axios from 'axios';

export const tiffApiKey = '7493ed314d705f34f311514d302079eb';

export const tiffApi = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
});
