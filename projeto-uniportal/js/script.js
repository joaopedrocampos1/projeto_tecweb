/* ============================================================
   1. ESTADO DA APLICAÇÃO (DADOS EM MEMÓRIA)
   ============================================================ */
const materiasAcademicas = [
    { nome: "Cálculo Numérico", professor: "Valnei Fernandes", sala: "PCA2", turma: "A" },
    { nome: "Computação Gráfica", professor: "Sofia Taguchi", sala: "PCB1", turma: "B" },
    { nome: "Projeto Integrador", professor: "Marcelo Alves", sala: "PJB5", turma: "A" },
    { nome: "Algoritmos e Estruturas", professor: "Edson Onishi", sala: "B5", turma: "C" }
];

/* ============================================================
   2. SISTEMA DE SEGURANÇA (O GUARDA)
   Ajustado: Agora o Login é o 'index.html' e a Home é 'home.html'
   ========================================================== */
function verificarProtecaoDePagina() {
    const estaLogado = localStorage.getItem('uniPortal_logado');
    const pag = window.location.pathname;

    // Atualizado com o nome novo: boletim.html
    if (!estaLogado && (pag.includes('home.html') || pag.includes('boletim.html') || pag.includes('disciplinas.html'))) {
        window.location.href = 'index.html';
    }
}

/* ============================================================
   3. LÓGICA DE LOGIN (PÁGINA: index.html)
   ============================================================ */
const formLogin = document.getElementById('formLogin');
const msgFeedback = document.getElementById('mensagemFeedback');

if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;

        if (email.trim() === "" || senha.trim() === "") {
            msgFeedback.innerHTML = "<p style='color: #B20000; font-weight: bold;'>⚠️ Preencha tudo!</p>";
        } else {
            localStorage.setItem('uniPortal_logado', 'true');
            window.location.href = 'home.html'; // Agora vai para a Home
        }
    });
}

/* ============================================================
   4. LISTAGEM DINÂMICA (PÁGINA: listagem.html)
   ============================================================ */
const corpoTabela = document.getElementById('corpoTabela');

if (corpoTabela) {
    corpoTabela.innerHTML = "";
    materiasAcademicas.forEach(materia => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${materia.nome}</td>
            <td>${materia.professor}</td>
            <td>${materia.sala} (Turma ${materia.turma})</td>
        `;
        corpoTabela.appendChild(linha);
    });
}

/* ============================================================
   5. LOGOUT (BOTÃO SAIR)
   ============================================================ */
const btnSair = document.getElementById('btnSair');

if (btnSair) {
    btnSair.addEventListener('click', function() {
        localStorage.removeItem('uniPortal_logado');
        window.location.href = 'index.html'; // Volta para o Login
    });
}


/* ============================================================
   LÓGICA DO NOVO BOLETIM (PÁGINA: boletim.html)
   ============================================================ */
const notasBoletimNovo = [
    { nome: "Computação Gráfica", codigo: "MCA304", nota: 7.8, freq: 85, corFreq: "#e74c3c" },
    { nome: "Projeto Integrador", codigo: "MDC312", nota: 8.5, freq: 92, corFreq: "#2ecc71" },
    { nome: "Cálculo Numérico", codigo: "MAT201", nota: 7.8, freq: 78, corFreq: "#f1c40f" },
    { nome: "Engenharia de Software", codigo: "ENS150", nota: 7.2, freq: 80, corFreq: "#e74c3c" }
];

const containerCards = document.getElementById('cardsBoletim');
const listaMiniNotas = document.getElementById('listaMiniNotas');

if (containerCards && listaMiniNotas) {
    containerCards.innerHTML = "";
    listaMiniNotas.innerHTML = "";

    notasBoletimNovo.forEach(materia => {
        // 1. Cria o Card Grande da Direita
        const article = document.createElement('article');
        article.className = 'boletim-materia-card';
        article.innerHTML = `
            <div class="materia-cabecalho">
                <div class="materia-info">
                    <h3>${materia.nome}</h3>
                    <span>${materia.codigo}</span>
                </div>
                <div class="materia-nota">${materia.nota.toFixed(1)}</div>
            </div>
            <div class="materia-frequencia">
                <p>Frequência — ${materia.freq}%</p>
                <div class="barra-fundo">
                    <div class="barra-preenchida" style="width: ${materia.freq}%; background-color: ${materia.corFreq};"></div>
                </div>
                <div class="barra-legendas">
                    <span>0%</span>
                    <span class="minimo">75% mín.</span>
                    <span>100%</span>
                </div>
            </div>
        `;
        containerCards.appendChild(article);

        // 2. Cria a linhazinha da Distribuição (Esquerda)
        const li = document.createElement('li');
        li.innerHTML = `<span class="bolinha" style="background-color: ${materia.corFreq}"></span> ${materia.codigo} <strong>${materia.nota.toFixed(1)}</strong>`;
        listaMiniNotas.appendChild(li);
    });
}

/* ============================================================
   MENU ATIVO DINÂMICO
   Descobre em qual página o usuário está e marca o menu.
   ============================================================ */
function marcarMenuAtivo() {
    // 1. Pega o nome do arquivo atual da URL (ex: 'boletim.html')
    const paginaAtual = window.location.pathname.split('/').pop();
    
    // 2. Seleciona todos os links dentro do menu lateral
    const linksDoMenu = document.querySelectorAll('.sidebar menu a');

    // 3. Percorre cada link
    linksDoMenu.forEach(link => {
        // Pega o que está escrito no 'href' do link
        const destinoDoLink = link.getAttribute('href');

        // Se o href do link for igual à página que estamos agora...
        if (destinoDoLink === paginaAtual) {
            link.classList.add('active'); // Adiciona o marcador vermelho!
        } else {
            link.classList.remove('active'); // Garante que os outros fiquem sem marcador
        }
    });
}

// Executa a função assim que o script é carregado
marcarMenuAtivo();







// Inicia a segurança
verificarProtecaoDePagina();

