/* ============================================================
   1. DADOS DA APLICAÇÃO
   ============================================================ */
const materiasAcademicas = [
    { nome: "Cálculo Numérico", professor: "Valnei Fernandes", sala: "PCA2", turma: "A" },
    { nome: "Computação Gráfica", professor: "Sofia Taguchi", sala: "PCB1", turma: "B" },
    { nome: "Projeto Integrador", professor: "Marcelo Alves", sala: "PJB5", turma: "A" },
    { nome: "Algoritmos e Estruturas", professor: "Edson Onishi", sala: "B5", turma: "C" }
];

const notasBoletim = [
    { nome: "Computação Gráfica", codigo: "MCA304", nota: 7.8, freq: 85, corFreq: "#e74c3c" },
    { nome: "Projeto Integrador", codigo: "MDC312", nota: 8.5, freq: 92, corFreq: "#2ecc71" },
    { nome: "Cálculo Numérico", codigo: "MAT201", nota: 7.8, freq: 78, corFreq: "#f1c40f" },
    { nome: "Engenharia de Software", codigo: "ENS150", nota: 7.2, freq: 80, corFreq: "#e74c3c" }
];

/* ============================================================
   2. SEGURANÇA DAS PÁGINAS
   ============================================================ */
function verificarProtecaoDePagina() {
    const estaLogado = localStorage.getItem("uniPortal_logado");
    const paginaAtual = window.location.pathname;
    const paginasProtegidas = ["home.html", "boletim.html", "disciplinas.html", "faturas.html", "carteirinha.html"];

    if (!estaLogado && paginasProtegidas.some((pagina) => paginaAtual.includes(pagina))) {
        window.location.href = "index.html";
    }
}

/* ============================================================
   3. LOGIN
   ============================================================ */
const formLogin = document.getElementById("formLogin");
const msgFeedback = document.getElementById("mensagemFeedback");

if (formLogin) {
    formLogin.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        if (email.trim() === "" || senha.trim() === "") {
            msgFeedback.innerHTML = "<p style='color: #B20000; font-weight: bold;'>Preencha tudo!</p>";
        } else {
            localStorage.setItem("uniPortal_logado", "true");
            window.location.href = "home.html";
        }
    });
}

/* ============================================================
   4. TABELA DE DISCIPLINAS
   ============================================================ */
const corpoTabela = document.getElementById("corpoTabela");
if (corpoTabela) {
    corpoTabela.innerHTML = "";
    materiasAcademicas.forEach((materia) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${materia.nome}</td>
            <td>${materia.professor}</td>
            <td>${materia.sala} (Turma ${materia.turma})</td>
        `;
        corpoTabela.appendChild(linha);
    });
}

/* ============================================================
   5. LOGOUT E MENU ATIVO
   ============================================================ */
const btnSair = document.getElementById("btnSair");
if (btnSair) {
    btnSair.addEventListener("click", function() {
        localStorage.removeItem("uniPortal_logado");
        window.location.href = "index.html";
    });
}

function marcarMenuAtivo() {
    const paginaAtual = window.location.pathname.split("/").pop();
    const linksDoMenu = document.querySelectorAll(".sidebar menu a");

    linksDoMenu.forEach((link) => {
        const destinoDoLink = (link.getAttribute("href") || "").split("#")[0];
        if (destinoDoLink === paginaAtual) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/* ============================================================
   6. BOLETIM
   ============================================================ */
const containerCards = document.getElementById("cardsBoletim");
const listaMiniNotas = document.getElementById("listaMiniNotas");

if (containerCards && listaMiniNotas) {
    containerCards.innerHTML = "";
    listaMiniNotas.innerHTML = "";

    notasBoletim.forEach((materia) => {
        const article = document.createElement("article");
        article.className = "boletim-materia-card";
        article.innerHTML = `
            <div class="materia-cabecalho">
                <div class="materia-info">
                    <h3>${materia.nome}</h3>
                    <span>${materia.codigo}</span>
                </div>
                <div class="materia-nota">${materia.nota.toFixed(1)}</div>
            </div>
            <div class="materia-frequencia">
                <p>Frequência - ${materia.freq}%</p>
                <div class="barra-fundo">
                    <div class="barra-preenchida" style="width: ${materia.freq}%; background-color: ${materia.corFreq};"></div>
                </div>
                <div class="barra-legendas">
                    <span>0%</span>
                    <span class="minimo">75% min.</span>
                    <span>100%</span>
                </div>
            </div>
        `;
        containerCards.appendChild(article);

        const li = document.createElement("li");
        li.innerHTML = `<span class="bolinha" style="background-color: ${materia.corFreq}"></span> ${materia.codigo} <strong>${materia.nota.toFixed(1)}</strong>`;
        listaMiniNotas.appendChild(li);
    });
}

/* ============================================================
   7. TEMA ESCURO
   ============================================================ */
const btnTema = document.getElementById("btnTema");
const body = document.body;

if (localStorage.getItem("uniPortal_temaEscuro") === "true") {
    body.classList.add("dark-theme");
    if (btnTema) btnTema.innerHTML = "☀️ Claro";
}

if (btnTema) {
    btnTema.addEventListener("click", function(e) {
        e.preventDefault();
        body.classList.toggle("dark-theme");
        
        if (body.classList.contains("dark-theme")) {
            localStorage.setItem("uniPortal_temaEscuro", "true");
            btnTema.innerHTML = "☀️ Claro";
        } else {
            localStorage.setItem("uniPortal_temaEscuro", "false");
            btnTema.innerHTML = "🌙 Escuro";
        }
    });
}

/* Inicializa scripts gerais */
marcarMenuAtivo();
verificarProtecaoDePagina();