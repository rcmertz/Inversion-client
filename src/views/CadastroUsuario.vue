import router from '@/router';


import { RouterLink } from 'vue-router';

<template>
  <section class="hero is-fullheight backgroud">
    <div class="hero-body">
      <form @submit.prevent="cadastro" class="cadastroForm">
        <div class="container">
          <div class="columns is-centered">
            <div class="bodycadastro column is-align-items-center">
              <div class="flex">
                <div class="column is-one-third-desktop is-three-fifths box is-flex">

                  <div class="field title">
                    <h2 style="font-size: 38px; font-family: Inter,sans-serif; font-weight: bold ">
                      | INVERSIÓN</h2>
                  </div>

                  <div class="field" style="max-width: 100%; min-width: 90%; margin-top: 10%">
                    <label style="font-family: Inter,sans-serif; font-weight: bold;">E-MAIL</label>
                    <input class="input cadastro input is-sucess" type="text" placeholder="name@gmail.com" />
                  </div>

                  <div class="field" style="max-width: 100%; min-width: 90%">
                    <label style="font-family: Inter,sans-serif; font-weight: bold;">SENHA</label>
                    <input class="input cadastro input is-sucess" type="password" placeholder="senha" />
                  </div>

                  <div class="field " style="max-width: 100%; min-width: 40%">
                    <div class="control is-justify-content-flex-end">
                      <router-link to="/login">
                        <button type="submit" class="btn-cadastro button mt-5 has-text-weight-bold" style="width: 100%">
                          CRIAR CONTA
                        </button>
                     </router-link>
                    </div>
                  </div>

                  <div class="has-text-left">
                    <p style="font-size: 12px; font-family: Inter,sans-serif;">FAZER
                      <router-link to="/login">
                        <strong style="color: #00FF7F">LOGIN</strong>
                      </router-link>
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

.backgroud {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #3C3C3C;
}

.title {
  display: flex;
  justify-content: center;
}

.cadastro {
  height: 6vh;
  width: 28vw;
  border-radius: 8px;
  border-color: black;
  background: rgba(25, 25, 112, 0.1);
  border: none;
}

.cadastro::placeholder {
  opacity: 1;
  color: 191970;
}

.flex {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.box {
  position: relative;
  background-color: #FFFFFF;
  border-radius: 8px;
  flex-direction: column;
  padding: 100px;
  // align-items: center;
  width: 40%;
}

.btn-cadastro {
  font-family: Inter, sans-serif;
  font-weight: bold;
  border-radius: 8px;
  height: 2.7vw;
  background-color: #00FF7F;
  color: #040404;
  font-size: 18px;
}

.cadastroForm {
  width: 100%;
  height: 100%;
}
</style>