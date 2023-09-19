<template>
    <div class="video-card" style="margin-left: 6%; margin-top: 4%; width: fit-content">
        <h2 class="titulo"> Videos e Tutoriais</h2>

        <div class="video-cards-container">
            <div class="video-card hover" data-video-url="URL_DO_VIDEO1">
                <div class="thumbnail">
                    <img src="https://www.intermedia-solutions.net/wp-content/uploads/2021/06/video-thumbnail-01.jpg"
                        alt="Thumbnail 1">
                </div>
                <div class="info">
                    <h3>Título do Vídeo 1</h3>
                    <p>Descrição do Vídeo 1.</p>
                </div>
            </div>

            <div class="video-card hover" data-video-url="URL_DO_VIDEO2">
                <div class="thumbnail">
                    <img src="https://www.intermedia-solutions.net/wp-content/uploads/2021/06/video-thumbnail-01.jpg"
                        alt="Thumbnail 2">
                </div>
                <div class="info">
                    <h3>Título do Vídeo 2</h3>
                    <p>Descrição do Vídeo 2.</p>
                </div>
            </div>

            <div class="video-card hover" data-video-url="URL_DO_VIDEO2">
                <div class="thumbnail">
                    <img src="https://www.intermedia-solutions.net/wp-content/uploads/2021/06/video-thumbnail-01.jpg"
                        alt="Thumbnail 2">
                </div>
                <div class="info">
                    <h3>Título do Vídeo 2</h3>
                    <p>Descrição do Vídeo 2.</p>
                </div>
            </div>
            <!-- ... -->
        </div>
    </div>
    <div class="dicas-card">
        <h2 class="titulo"> Dicas de investimento</h2>

        <div class="card-container" style=" color: white;">

            <div class="card">
                <h3>Título 1</h3>
                <p>Texto do Card 1. Este card expande no hover.</p>
            </div>

            <div class="card">
                <h3>Título 2</h3>
                <p>Texto do Card 2. Este card expande no hover.</p>
            </div>

            <div class="card">
                <h3>Título 3</h3>
                <p>Texto do Card 3. Este card expande no hover.</p>
            </div>

            <div class="card">
                <h3>Título 4</h3>
                <p>Texto do Card 4. Este card expande no hover.</p>
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
    margin-top: 4%;
}

.titulo {
    color: antiquewhite;
    margin-bottom: 14px;
}

.video-card:hover {
    transform: scale(1.05);

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
  