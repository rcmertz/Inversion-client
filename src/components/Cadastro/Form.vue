<script setup lang="ts">
  import { reactive } from 'vue';
  import { RouterLink } from 'vue-router';
  import { useIMask } from 'vue-imask';
  import { localRegister } from '@/stores/user';

  // valores enviados ao backend
  const form = reactive({
    nome: '',
    email: '',
    senha: '',
    ativo: true,
  });

  // cria máscara no input e retorna valor sem máscara
  const { el: cpf, unmasked: unmaskedCPF } = useIMask({
    mask: '000.000.000-00',
  });

  // cria máscara no input e retorna valor sem máscara
  const { el: phone, unmasked: unmaskedPhone } = useIMask({
    mask: '(00) 00000-0000',
  });

  async function handleSubmit() {
    await localRegister({
      ...form,
      cpf: unmaskedCPF.value,
      telefone: unmaskedPhone.value,
    });
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-row">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" placeholder="name" v-model="form.nome" required />
    </div>
    <!-- <div class="form-row">
      <label for="sobrenome">Sobrenome</label>
      <input
        type="text"
        name="sobrenome"
        id="sobrenome"
        placeholder="last name"
        v-model="form.sobrenome"
        required
      />
    </div> -->
    <div class="form-row">
      <label for="email">E-mail</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="name@gmail.com"
        v-model="form.email"
        required
      />
    </div>
    <div class="form-row">
      <label for="telefone">Telefone</label>
      <input
        type="text"
        name="telefone"
        id="telefone"
        placeholder="(99) 99999-9999"
        maxlength="15"
        ref="phone"
        required
      />
    </div>
    <div class="form-row">
      <label for="cpf">CPF</label>
      <input
        type="text"
        name="cpf"
        id="cpf"
        placeholder="123.456.789-01"
        maxlength="14"
        ref="cpf"
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
        v-model="form.senha"
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
    gap: 12px;
  }

  label {
    font-family: var(--inter);
    font-size: 20px;
    font-weight: 600;
  }

  input {
    background-color: var(--input);
    padding: 24px;
    border-radius: 8px;
    font-size: 18px;
    font-family: var(--montserrat);
    font-weight: 500;
  }

  .already-member {
    text-transform: uppercase;
    font-family: var(--inter);
    font-weight: 600;
    font-size: 16px;
    grid-column: span 2 / span 2;
    margin-top: -5px;
  }

  .already-member > a {
    color: var(--primary);
    text-decoration: none;
    font-family: var(--inter);
  }

  button {
    padding-block: 24px;
    text-transform: uppercase;
    background-color: var(--primary-alt);
    font-family: var(--inter);
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px;
    grid-column: span 2 / span 2;
  }
</style>
