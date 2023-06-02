<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<template>
  <form>
    <h2>Inversión</h2>
    <div class="form-row email">
      <label for="email">E-mail</label>
      <input type="text" name="email" id="email" placeholder="name@gmail.com" />
    </div>
    <div class="form-row password">
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" placeholder="password" />
    </div>
    <div class="auth-options">
      <p>Não tem conta? <RouterLink class="go-register" to="/cadastro">Criar</RouterLink></p>
      <p><span>Esqueceu</span> sua senha?</p>
    </div>
    <button type="button" @click="router.push('/')">Entrar</button>
  </form>
</template>

<style scoped>
  form {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 82px 52px 32px;
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
    font-size: 30px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    text-transform: uppercase;
    padding-left: 10px;
  }

  input {
    background-color: var(--input);
    border-radius: 8px;
    padding: 34px;
    border: none;
    outline: none;
    font-size: 25px;
    font-family: 'Montserrat', sans-serif;
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
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 20;
  }

  .auth-options > p > span,
  .go-register {
    font-family: 'Inter', sans-serif;
    color: var(--primary);
    cursor: pointer;
    text-decoration: none;
  }

  button {
    align-self: flex-end;
    background-color: var(--primary);
    border-radius: 8px;
    font-size: 35px;
    font-weight: 600;
    border: none;
    text-transform: uppercase;
    padding: 18px 32px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: var(--primary-alt);
  }
</style>
