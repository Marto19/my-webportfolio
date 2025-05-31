import { translations } from './translations.js';

let currentLang = 'en';

export function initializeTerminal() {
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('gameOutput');
    
    const terminalCommands = {
        en: {
            help: 'Available commands: help, about, skills, joke, matrix, clear',
            about: 'Hi! I\'m Martin, a Computer Science student and Software Engineer.',
            skills: 'Java, Python, C++, Bash, System Administration, and more!',
            joke: [
                'Why do programmers prefer dark mode? Because light attracts bugs!',
                'Why did the programmer quit his job? Because he didn\'t get arrays!',
                'What\'s a programmer\'s favorite hangout spot? The Foo Bar!'
            ],
            matrix: 'Wake up, Neo... The Matrix has you... Follow the white rabbit. 🐰',
            clear: 'CLEAR_COMMAND',
            notFound: (cmd) => `Command not found: ${cmd}. Type 'help' for available commands.`
        },
        bg: {
            help: 'Налични команди: help, about, skills, joke, matrix, clear',
            about: 'Здравейте! Аз съм Мартин, студент по Компютърни науки и Софтуерен инженер.',
            skills: 'Java, Python, C++, Bash, Системна администрация и други!',
            joke: [
                'Защо програмистите предпочитат тъмен режим? Защото светлината привлича бъгове!',
                'Защо програмистът напуснал работа? Защото не получил масиви!',
                'Кое е любимото място на програмистите? Foo Bar-ът!'
            ],
            matrix: 'Събуди се, Нео... Матрицата те има... Следвай белия заек. 🐰',
            clear: 'CLEAR_COMMAND',
            notFound: (cmd) => `Командата не е намерена: ${cmd}. Напишете 'help' за наличните команди.`
        }
    };

    // Event listener for language changes
    document.addEventListener('languageChanged', (e) => {
        currentLang = e.detail.language;
        updateTerminalWelcome();
    });

    function updateTerminalWelcome() {
        const welcomeMsg = document.querySelector('#gameOutput div[data-i18n="terminalWelcome"]');
        const commandsMsg = document.querySelector('#gameOutput div[data-i18n="terminalCommands"]');
        const konamiMsg = document.querySelector('#gameOutput div[data-i18n="terminalKonami"]');
        
        if (welcomeMsg) welcomeMsg.textContent = translations[currentLang].terminalWelcome;
        if (commandsMsg) commandsMsg.textContent = translations[currentLang].terminalCommands;
        if (konamiMsg) konamiMsg.textContent = translations[currentLang].terminalKonami;
    }

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.toLowerCase().trim();
            const outputDiv = document.createElement('div');
            outputDiv.innerHTML = `<span style="color: var(--accent);">guest@martin-portfolio:~$ </span>${input.value}`;
            output.appendChild(outputDiv);

            const responseDiv = document.createElement('div');
            responseDiv.style.color = 'var(--text-secondary)';
            responseDiv.style.marginBottom = '0.5rem';

            if (terminalCommands[currentLang][cmd]) {
                if (cmd === 'clear') {
                    output.innerHTML = `
                        <div style="color: var(--accent);" data-i18n="terminalWelcome">${translations[currentLang].terminalWelcome}</div>
                        <div style="color: var(--text-secondary);" data-i18n="terminalCommands">${translations[currentLang].terminalCommands}</div>
                        <div style="color: var(--text-secondary);" data-i18n="terminalKonami">${translations[currentLang].terminalKonami}</div>
                    `;
                } else if (cmd === 'joke') {
                    const jokes = terminalCommands[currentLang].joke;
                    responseDiv.textContent = jokes[Math.floor(Math.random() * jokes.length)];
                    output.appendChild(responseDiv);
                } else {
                    responseDiv.textContent = terminalCommands[currentLang][cmd];
                    output.appendChild(responseDiv);
                }
            } else {
                responseDiv.innerHTML = `<span style="color: #ff6b6b;">${terminalCommands[currentLang].notFound(cmd)}</span>`;
                output.appendChild(responseDiv);
            }

            input.value = '';
            output.scrollTop = output.scrollHeight;
        }
    });
}
