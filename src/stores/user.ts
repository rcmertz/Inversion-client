import { IUser } from '@/interfaces/user';
import { router } from '@/routes/routes';
import { getCurrentUser, login, register, updateUser } from '@/services/user';
import { reactive } from 'vue';

// itens do salvos no local storage
const user = localStorage.getItem('InversionUser');
const token = localStorage.getItem('InversionToken');

// store de usuário
export const useUser = reactive({
  user: user ? (JSON.parse(user) as IUser) : null,
  token: token ? token : '',
});

// cadastrar usuário e salvar dados no local storage
export async function localRegister(userData: object) {
  try {
    const { data } = await register(userData);

    useUser.user = data;
    localStorage.setItem('InversionUser', JSON.stringify(data));

    alert('Usuário cadastrado com sucesso. Obrigado pela preferência!');
    router.push('/');
  } catch (error) {
    alert(error.response.data.erro);
    // alert(
    //   error.response.status === 400
    //     ? 'CPF ou Email já cadastrados, tente novamente.'
    //     : 'Ocorreu algum erro, tente novamente mais tarde.'
    // );
  }
}

// fazer login e salvar token no local storage
export async function localLogin(userData: object) {
  try {
    const { data } = await login(userData);

    useUser.token = data.access_token;
    localStorage.setItem('InversionToken', data.access_token);

    router.push('/');
  } catch (error: any) {
    alert('Email ou senha inválidos, tente novamente.');
  }
}

// pegar dados do usuário. Se falhar, destrói JWT
export async function getLocalUser() {
  try {
    const { data } = await getCurrentUser();

    useUser.user = data;
    localStorage.setItem('InversionUser', JSON.stringify(data));
  } catch (error) {
    localStorage.removeItem('InversionToken');
    useUser.token = '';
  }
}

// editar dados do usuario
export async function updateLocalUser(id: number, userData: object) {
  try {
    const { data } = await updateUser(id, userData);

    useUser.user = data;
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}

// logout
export async function localLogout() {
  try {
    // await logout(id, userData);

    useUser.user = null;
    useUser.token = '';

    localStorage.removeItem('InversionToken');
    localStorage.removeItem('InversionUser');
  } catch (error: any) {
    console.log(error);
    alert(error.response.data.erro);
  }
}
