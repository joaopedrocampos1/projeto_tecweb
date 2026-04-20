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
   ============================================================ */
function verificarProtecaoDePagina() {
    const estaLogado = localStorage.getItem('uniPortal_logado');
    const paginaAtual = window.location.pathname;

    // Se NÃO estiver logado e tentar acessar a Home ou o Boletim...
    if (!estaLogado && (paginaAtual.includes('home.html') || paginaAtual.includes('listagem.html'))) {
        window.location.href = 'index.html'; // Manda pro Login (seu novo index)
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

// Inicia a segurança
verificarProtecaoDePagina();