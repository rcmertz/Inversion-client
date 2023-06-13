<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import { RouterLink } from 'vue-router';

  const form = reactive({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });

  const cpf = ref('');

  watch(cpf, (newValue) => {
    const cleanedCpf = newValue.replace(/\D/g, '');
    if (cleanedCpf.length === 11) {
      const formatted = cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      cpf.value = formatted;
    } else {
      cpf.value = cleanedCpf;
    }
  });

  function handleSubmit() {
    console.log({ ...form, cpf: cpf.value });
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-row">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" placeholder="name" v-model="form.name" required />
    </div>
    <div class="form-row">
      <label for="sobrenome">Sobrenome</label>
      <input
        type="text"
        name="sobrenome"
        id="sobrenome"
        placeholder="last name"
        v-model="form.lastName"
        required
      />
    </div>
    <div class="form-row">
      <label for="email">E-mail</label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="name@gmail.com"
        v-model="form.email"
        required
      />
    </div>
    <div class="form-row">
      <label for="cpf">CPF</label>
      <input
        type="text"
        maxlength="11"
        name="cpf"
        id="cpf"
        placeholder="123.456.789-01"
        v-model="cpf"
        required
      />
    </div>
    <div class="form-row">
      <label for="senha">Senha</label>
      <input
        type="password"
        name="senha"
        id="senha"
        placeholder="password"
        v-model="form.password"
        required
      />
    </div>
    <p class="already-member">Já é membro? <RouterLink to="/login">Entrar</RouterLink></p>
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
    padding: 52px;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  label {
    font-family: var(--inter);
    font-size: 24px;
    font-weight: 600;
  }

  input {
    background-color: var(--input);
    padding: 28px;
    border-radius: 8px;
    font-size: 20px;
    font-family: var(--montserrat);
    font-weight: 500;
  }

  .already-member {
    text-transform: uppercase;
    font-family: var(--inter);
    font-weight: 600;
    font-size: 20;
    grid-column: span 2 / span 2;
    margin-top: -5px;
  }

  .already-member > a {
    color: var(--primary);
    text-decoration: none;
    font-family: var(--inter);
  }

  button {
    padding-block: 26px;
    text-transform: uppercase;
    background-color: var(--primary-alt);
    font-family: var(--inter);
    font-size: 28px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px;
    grid-column: span 2 / span 2;
  }
</style>
