<script setup lang="ts">
  import { login } from '@/stores/user';
  import { reactive } from 'vue';

  const user = reactive({ email: '', password: '' });

  function handleSubmit() {
    login(user);
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h2>Inversión</h2>
    <div class="form-row email">
      <label for="email">E-mail</label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="name@gmail.com"
        v-model="user.email"
        required
      />
    </div>
    <div class="form-row password">
      <label for="senha">Senha</label>
      <input
        type="password"
        name="senha"
        id="senha"
        placeholder="password"
        v-model="user.password"
        required
      />
    </div>
    <div class="auth-options">
      <p>Não tem conta? <RouterLink class="go-register" to="/cadastro">Criar</RouterLink></p>
    </div>
    <button type="submit">Entrar</button>
  </form>
</template>

<style scoped>
  form {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 52px 32px;
    border-radius: 25px;
    width: 775px;
  }

  h2 {
    font-size: 64px;
    font-weight: 600;
    text-transform: uppercase;
    border-left: solid 4px #000;
    line-height: 45px;
    padding-left: 19px;
    margin-bottom: 101px;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: 17px;
    width: 100%;
  }

  .email {
    margin-bottom: 52px;
  }

  .password {
    margin-bottom: 27px;
  }

  label {
    font-size: 24px;
    font-weight: 600;
    font-family: var(--inter);
    text-transform: uppercase;
    /* padding-left: 10px; */
  }

  input {
    background-color: var(--input);
    border-radius: 8px;
    padding: 32px;
    border: none;
    outline: none;
    font-size: 20px;
    font-family: var(--montserrat);
    font-weight: 500;
  }

  .auth-options {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 29px;
  }

  .auth-options > p {
    text-transform: uppercase;
    font-family: var(--inter);
    font-weight: 600;
    font-size: 20;
  }

  .auth-options > p > span,
  .go-register {
    font-family: var(--inter);
    color: var(--primary);
    cursor: pointer;
    text-decoration: none;
  }

  button {
    align-self: flex-end;
    background-color: var(--primary);
    border-radius: 8px;
    font-size: 28px;
    font-weight: 600;
    border: none;
    text-transform: uppercase;
    padding: 18px 40px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: var(--primary-alt);
  }
</style>
