import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const api = axios.create({
  withCredentials: true,
  baseURL: '/',
});

export const userStore = reactive({
  user: undefined,
});

const router = useRouter();

export async function login(userData: object) {
  try {
    const { data } = await api.post('/', userData);

    userStore.user = data.user;

    router.push('/');
  } catch (error) {
    console.log(error);
  }
}
