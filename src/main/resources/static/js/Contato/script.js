document.addEventListener('DOMContentLoaded', () => {
    console.log('Página de contatos carregada');

    // === Tradução ===
    function setLanguage(lang) {
        document.querySelectorAll('[data-pt]').forEach(el => {
            el.innerText = el.getAttribute(`data-${lang}`);
        });
    }

    window.setLanguage = setLanguage;

    // Aplica o idioma salvo ao carregar a página
    const savedLang = localStorage.getItem('lang') || 'pt';
    setLanguage(savedLang);

    // Exemplo de como você pode ter um comportamento em uma seção de contatos
    const form = document.getElementById("contato-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            // Mensagens de sucesso em português e inglês
            const successMessage = savedLang === 'pt' ? "Mensagem enviada com sucesso!" : "Message sent successfully!";
            alert(successMessage);

            // Aqui você pode adicionar o envio de dados para o servidor ou qualquer outra ação após o envio do formulário
        });
    }

    // Adicionando comportamento das bandeiras para troca de idioma
    const flagPT = document.querySelector('img[alt="Português"]');
    const flagEN = document.querySelector('img[alt="English"]');

    if (flagPT) {
        flagPT.addEventListener('click', () => {
            setLanguage('pt');
            localStorage.setItem('lang', 'pt');
        });
    }

    if (flagEN) {
        flagEN.addEventListener('click', () => {
            setLanguage('en');
            localStorage.setItem('lang', 'en');
        });
    }
});
