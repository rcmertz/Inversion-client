import { IUser } from '@/interfaces/user';
import { router } from '@/routes/routes';
import { getCurrentUser, login, register, updateUser } from '@/services/user';
import { reactive } from 'vue';

const user = localStorage.getItem('InversionUser');
const token = localStorage.getItem('InversionToken');

export const userStore = reactive({
  user: user ? (JSON.parse(user) as IUser) : null,
  token: token ? token : '',
});

export async function localRegister(userData: object) {
  try {
    const { data } = await register(userData);

    userStore.user = data;
    localStorage.setItem('InversionUser', JSON.stringify(data));

    router.push('/login');
  } catch (error: any) {
    alert(
      error.response.status === 400
        ? 'CPF ou Email já cadastrados, tente novamente.'
        : 'Ocorreu algum erro, tente novamente mais tarde.'
    );
  }
}

export async function localLogin(userData: object) {
  try {
    const { data } = await login(userData);

    userStore.token = data.access_token;
    localStorage.setItem('InversionToken', data.access_token);

    router.push('/');
  } catch (error: any) {
    alert(
      error.response.data.message === 'Bad credentials'
        ? 'Email ou senha inválidos, tente novamente.'
        : 'Ocorreu algum erro, tente novamente mais tarde.'
    );
  }
}

export async function getLocalUser() {
  try {
    const { data } = await getCurrentUser();

    userStore.user = data;
    localStorage.setItem('InversionUser', JSON.stringify(data));
  } catch (error) {
    localStorage.removeItem('InversionToken');
    userStore.token = '';
  }
}

export async function updateLocalUser(id: number, userData: object) {
  try {
    const { data } = await updateUser(id, userData);

    userStore.user = data;
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}

export async function localLogout() {
  try {
    // await logout(id, userData);

    userStore.user = null;
    userStore.token = '';

    localStorage.removeItem('InversionToken');
    localStorage.removeItem('InversionUser');
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}
