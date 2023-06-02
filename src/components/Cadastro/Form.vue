<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function handleSubmit() {
    router.push('/');
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-row">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" />
    </div>
    <div class="form-row">
      <label for="sobrenome">Sobrenome</label>
      <input type="text" name="sobrenome" id="sobrenome" />
    </div>
    <div class="form-row">
      <label for="email">E-mail</label>
      <input type="text" name="email" id="email" />
    </div>
    <div class="form-row">
      <label for="cpf">CPF</label>
      <input type="text" name="cpf" id="cpf" />
    </div>
    <div class="form-row">
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" />
    </div>
    <button type="submit">Criar conta</button>
  </form>
</template>

<style scoped>
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 32px;
    column-gap: 82px;
    background-color: #fff;
    padding: 84px 95px 57px;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  label {
    font-family: 'Inter', sans-serif;
    font-size: 30px;
    font-weight: 600;
  }

  input {
    background-color: var(--input);
    padding: 24px;
    height: 85.5px;
    border-radius: 4px;
    font-size: 20px;
    font-family: 'Montserrat', sans-serif;
  }

  button {
    padding-block: 26px;
    text-transform: uppercase;
    background-color: var(--primary-alt);
    font-family: 'Inter' sans-serif;
    font-size: 30px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px;
    margin-top: 50px;
    grid-column: span 2 / span 2;
  }
</style>
