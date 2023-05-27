<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-6-desktop is-3-widescreen">
            <div class="box">
              <h1 class="title has-text-centered">| INVERSIÓN</h1>
              <form @submit.prevent="submitForm">
                <div class="field">
                  <label class="label">E-MAIL</label>
                  <div class="control">
                    <input class="input" type="email" v-model="email" required>
                  </div>
                </div>
                <div class="field">
                  <label class="label">SENHA</label>
                  <div class="control">
                    <input class="input" type="password" v-model="password" required>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button class="button is-primary is-fullwidth" type="submit">Entrar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      // Lógica de autenticação aqui
      console.log('Login submetido');
    }
  }
};
</script>

<style scoped>
.hero {
  background-color: #FFFFFF;
}

.box {
  background-color: #FFFFFF;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  color: #363636;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.label {
  color: #363636;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.input {
  border: none;
  box-shadow: none;
  border-radius: 3px;
  background-color: #f2f2f2;
  padding: 0.75rem 1rem;
  color: #363636;
  margin-bottom: 1rem;
}

.button {
  background-color: #00FF7F;
  color: #040404;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
}

.button:hover {
  background-color: #2769c5;
}
</style>
