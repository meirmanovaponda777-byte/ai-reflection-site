// Элементы страницы
const ruBtn = document.getElementById('ruBtn');
const kzBtn = document.getElementById('kzBtn');
const description = document.getElementById('description');
const disclaimer = document.getElementById('disclaimer');
const analyzeBtn = document.getElementById('analyzeBtn');
const result = document.getElementById('result');
const genderSelect = document.getElementById('genderSelect'); // <select> для пола

// Тексты на двух языках
const texts = {
    ru: {
        description: "Сервис анализа текста ИИ. Структурируйте мысли и задавайте вопросы для саморефлексии.",
        disclaimer: "Это не психологическая консультация и не заменяет работу с психологом.",
        analyzeBtn: "Проанализировать текст"
    },
    kz: {
        description: "Мәтінді жасанды интеллект арқылы талдау сервисі. Ойларды құрылымдауға және өзін-өзі талдауға арналған сұрақтар қойыңыз.",
        disclaimer: "Бұл психологиялық кеңес емес және психологпен жұмысқа балама емес.",
        analyzeBtn: "Мәтінді талдау"
    }
};

// Переключение языка
function setLanguage(lang) {
    description.textContent = texts[lang].description;
    disclaimer.textContent = texts[lang].disclaimer;
    analyzeBtn.textContent = texts[lang].analyzeBtn;
    result.textContent = '';
    document.documentElement.lang = lang; // сохраняем язык для запроса
}

// События для кнопок языка
ruBtn.addEventListener('click', () => setLanguage('ru'));
kzBtn.addEventListener('click', () => setLanguage('kz'));

// Отправка текста на сервер Flask
analyzeBtn.addEventListener("click", async () => {
    const text = document.getElementById("userText").value;
    const lang = document.documentElement.lang || 'ru';
    const gender = genderSelect ? genderSelect.value : 'any';

    if (!text.trim()) {
        alert("Введите текст!");
        return;
    }

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
