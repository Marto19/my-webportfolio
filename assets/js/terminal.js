export function initializeTerminal() {
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('gameOutput');
    
    const commands = {
        help: () => 'Available commands: help, about, skills, joke, matrix, clear',
        about: () => 'Hi! I\'m Martin, a Computer Science student and Software Engineer.',
        skills: () => 'Java, Python, C++, Bash, System Administration, and more!',
        joke: () => {
            const jokes = [
                'Why do programmers prefer dark mode? Because light attracts bugs!',
                'Why did the programmer quit his job? Because he didn\'t get arrays!',
                'What\'s a programmer\'s favorite hangout spot? The Foo Bar!'
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        },
        clear: () => {
            output.innerHTML = '';
            return '';
        }
    };

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.toLowerCase().trim();
            const response = commands[cmd] ? commands[cmd]() : `Command not found: ${cmd}`;
            
            output.innerHTML += `<div style="color: var(--accent);">guest@martin-portfolio:~$ ${cmd}</div>`;
            output.innerHTML += `<div style="color: var(--text-secondary);">${response}</div>`;
            
            input.value = '';
        }
    });
}
