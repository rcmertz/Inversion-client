<template>
    <div class="video-card" style="margin-left: 6%; margin-top: 4%; width: fit-content">
        <h2 class="titulo"> Videos e Tutoriais</h2>

        <div class="video-cards-container">
            <div class="video-card hover" data-video-url="URL_DO_VIDEO1">
                <div id="app">
                    <iframe src="https://www.youtube.com/embed/yHuNhkntc-I?si=Jc6hg2lO0BjadeB7" width="280"
                        height="180"></iframe>
                </div>
                <div class="info">
                    <h3>Como investir em ações</h3>
                    <p>GUIA BÁSICO PRA INVESTIR EM AÇÕES: TUDO que você PRECISA SABER antes de investir em AÇÕES!.</p>
                </div>
            </div>

            <div class="video-card hover" data-video-url="URL_DO_VIDEO2">
                <div id="app">
                    <iframe src="https://www.youtube.com/embed/EFpS2s4gFRY?si=2picmNsfXDISB0k7" width="280"
                        height="180"></iframe>
                </div>
                <div class="info">
                    <h3>Investimentos para iniciantes</h3>
                    <p>Os Melhores investimentos para iniciantes</p>
                </div>
            </div>

            <div class="video-card hover" data-video-url="URL_DO_VIDEO2">
                <div id="app">
                    <iframe src="https://www.youtube.com/embed/Acgd5fkXDmM?si=H-HkxI8NVeU_Gk1t=1" width="280"
                        height="180"></iframe>
                </div>
                <div class="info">
                    <h3>Iniciantes na Bolsa</h3>
                    <p>investimentos para iniciantes na bolsa de valores</p>
                </div>
            </div>
            <!-- ... -->
        </div>
    </div>
    <div class="dicas-card">
        <h2 class="titulo"> Dicas de investimento</h2>

        <div class="card-container" style=" color: white;">

            <div class="card">
                <h3>Diversifique sua Carteira</h3>
                <p>Distribua seus investimentos em diferentes ativos para reduzir riscos.</p>
            </div>

            <div class="card">
                <h3>Avalie o Perfil de Risco</h3>
                <p> Escolha investimentos alinhados com seu perfil de tolerância ao risco.</p>
            </div>

            <div class="card">
                <h3>Aprenda sobre ETFs</h3>
                <p>Texto do Card 3. Este card expande no hover.</p>
            </div>

            <div class="card">
                <h3>Eduque-se Constantemente</h3>
                <p>Mantenha-se atualizado com informações sobre o mercado e estratégias de investimento.</p>
            </div>
        </div>
    </div>
</template>
  
<!-- <script setup lang="ts">
export default {
    data() {
        return {
            videos: [
                {
                    thumbnailUrl: "URL_DA_IMAGEM1",
                    title: "Título do Vídeo 1",
                    description: "Descrição do Vídeo 1."
                },
                {
                    thumbnailUrl: "URL_DA_IMAGEM2",
                    title: "Título do Vídeo 2",
                    description: "Descrição do Vídeo 2."
                },
                // ...
            ]
        };
    }
};
</script> -->
  
<style scoped>
.video-cards-container {
    display: flex;
    gap: 20px;
}


.video-card {
    border: 1px solid #ccc;
    color: white !important;
    border-radius: 10px;
    padding: 10px;
    width: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
}

.hover:hover {
    background-color: #221e1e;
}

.dicas-card {
    border: 1px solid #ccc;
    color: white !important;
    border-radius: 10px;
    padding: 10px;
    width: fit-content;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    margin-left: 6%;
    margin-top: 2%;
}

.titulo {
    color: antiquewhite;
    margin-bottom: 14px;
}

.video-card:hover {
    transform: scale(1.07);

}

.thumbnail img {
    width: 100%;
    border-radius: 8px;
}

.info {
    margin-top: 10px;
}

.info h3 {
    font-size: 1.2rem;
    margin: 0;
}

.info p {
    font-size: 0.9rem;
    color: #555;
    margin: 0;
}

.card-container {
    display: flex;
    gap: 20px;
}

.card {
    width: 220px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
}

.card:hover {
    width: 300px;
    padding: 30px;
    background-color: #221e1e;
}

.card h3 {
    margin: 0 0 10px 0;
}

.card p {
    margin: 0;
    font-size: 0.9rem;
}
</style>
  

