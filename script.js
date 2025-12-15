// Элементы страницы
const ruBtn = document.getElementById('ruBtn');
const kzBtn = document.getElementById('kzBtn');
const description = document.getElementById('description');
const disclaimer = document.getElementById('disclaimer');
const analyzeBtn = document.getElementById('analyzeBtn');
const result = document.getElementById('result');
const genderSelect = document.getElementById('genderSelect');

// Тексты на двух языках
const texts = {
    ru: {
        description: "Этот сервис предназначен для анализа текста с использованием искусственного интеллекта. Он помогает структурировать мысли и задавать вопросы для саморефлексии.",
        disclaimer: "Данный сервис не является психологической консультацией и не заменяет работу с психологом.",
        analyzeBtn: "Проанализировать текст"
    },
    kz: {
        description: "Бұл сервис мәтінді жасанды интеллект арқылы талдауға арналған. Ол ойларды құрылымдауға және өзін-өзі талдауға арналған сұрақтар қоюға көмектеседі.",
        disclaimer: "Бұл сервис психологиялық кеңес бермейді және психологпен жұмыс жасаудың орнына алмайды.",
        analyzeBtn: "Мәтінді талдау"
    }
};

// Переключение языка
function setLanguage(lang) {
    description.textContent = texts[lang].description;
    disclaimer.textContent = texts[lang].disclaimer;
    analyzeBtn.textContent = texts[lang].analyzeBtn;
    result.textContent = '';
    document.documentElement.lang = lang; // обновляем язык страницы
}

// События для кнопок языка
ruBtn.addEventListener('click', () => setLanguage('ru'));
kzBtn.addEventListener('click', () => setLanguage('kz'));

// Отправка текста на сервер Flask
analyzeBtn.addEventListener("click", async () => {
    const text = document.getElementById("userText").value.trim();
    if (!text) {
        alert("Введите текст!");
        return;
    }

    const lang = document.documentElement.lang || 'ru';
    const gender = genderSelect.value || 'any';

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, lang, gender })
        });

        const data = await response.json();
        result.textContent = data.result;
    } catch (error) {
        result.textContent = "Ошибка сервера ИИ.";
        console.error(error);
    }
});
