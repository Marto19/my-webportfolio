/**
 * Interactive Terminal and Space Invaders Game Implementation
 * This module creates an interactive terminal interface with various commands
 * and includes a fully playable Space Invaders game.
 * 
 * Features:
 * - Command-line interface with various interactive commands
 * - Integrated Space Invaders game with ASCII graphics
 * - Custom game engine with collision detection
 * - Score tracking and lives system
 * - Easter eggs and hidden commands
 * 
 * Commands:
 * - help: Display available commands
 * - about: Show information about the developer
 * - skills: List technical skills
 * - joke: Display random programming jokes
 * - matrix: Matrix-related Easter egg
 * - clear: Clear the terminal
 * - invade: Start Space Invaders game
 * - quit: Exit the game
 * - konami: Secret Easter egg
 */

export function initializeTerminal() {
    // Get DOM elements for terminal interface
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('gameOutput');
    
    // Game state variables
    let gameInterval;
    let gameState = null;

    /**
     * Creates initial game state for Space Invaders
     * Includes player position, aliens grid, lasers, and game statistics
     * @returns {Object} Initial game state configuration
     */
    function createGameState() {
        return {
            player: { x: 40, lives: 3 },
            playerLaser: null,
            aliens: Array(24).fill().map((_, i) => ({ 
                x: (i % 8) * 8 + 10, 
                y: Math.floor(i / 8) * 2 + 3, 
                alive: true 
            })),
            alienLasers: [],
            alienDirection: 1,
            alienMoveTimer: 0,
            score: 0,
            gameOver: false,
            victory: false
        };
    }

    /**
     * Renders the game state to ASCII graphics
     * Creates a text-based representation of the game
     * @returns {string} Formatted game display string
     */
    function renderGame() {
        if (!gameState) return '';
        
        const width = 80;
        const height = 20;
        let display = Array(height).fill().map(() => Array(width).fill(' '));
        
        // Render aliens first (so they appear behind bullets)
        gameState.aliens.forEach(alien => {
            if (alien.alive && alien.y >= 0 && alien.y < height && 
                alien.x >= 0 && alien.x < width) {
                display[alien.y][alien.x] = '👾';
            }
        });
        
        // Render player laser (appears on top of aliens)
        if (gameState.playerLaser) {
            if (gameState.playerLaser.y >= 0 && gameState.playerLaser.y < height &&
                gameState.playerLaser.x >= 0 && gameState.playerLaser.x < width) {
                display[gameState.playerLaser.y][gameState.playerLaser.x] = '|';
            }
        }
        
        // Render alien lasers
        gameState.alienLasers.forEach(laser => {
            if (laser.y >= 0 && laser.y < height && 
                laser.x >= 0 && laser.x < width) {
                display[laser.y][laser.x] = '•';
            }
        });
        
        // Render player (always on top)
        if (gameState.player.x >= 0 && gameState.player.x < width) {
            display[height - 1][gameState.player.x] = '🚀';
        }
        
        // Add border
        for (let i = 0; i < width; i++) {
            display[1][i] = '-';
        }
        
        // Add score and lives on top
        const statusLine = `Score: ${gameState.score}  Lives: ${'💚'.repeat(gameState.player.lives)}  Aliens: ${gameState.aliens.filter(a => a.alive).length}`;
        const statusArray = statusLine.split('');
        for (let i = 0; i < Math.min(statusArray.length, width); i++) {
            display[0][i] = statusArray[i];
        }
        
        return display.map(row => row.join('')).join('\n');
    }

    /**
     * Updates game state on each frame
     * Handles:
     * - Player and alien movement
     * - Laser physics
     * - Collision detection
     * - Score tracking
     * - Game over conditions
     */
    function updateGame() {
        if (!gameState || gameState.gameOver) return;
        
        // Update player laser
        if (gameState.playerLaser) {
            gameState.playerLaser.y--;
            if (gameState.playerLaser.y < 0) {
                gameState.playerLaser = null;
            } else {
                // Check for alien hits - using more forgiving collision detection
                let hitDetected = false;
                gameState.aliens.forEach(alien => {
                    if (alien.alive && !hitDetected) {
                        // Check exact position and adjacent positions for better hit detection
                        const xDiff = Math.abs(alien.x - gameState.playerLaser.x);
                        const yDiff = Math.abs(alien.y - gameState.playerLaser.y);
                        
                        if (xDiff <= 1 && yDiff <= 0) {
                            alien.alive = false;
                            gameState.playerLaser = null;
                            gameState.score += 100;
                            hitDetected = true;
                        }
                    }
                });
            }
        }
        
        // Move aliens
        gameState.alienMoveTimer++;
        if (gameState.alienMoveTimer >= 8) {
            gameState.alienMoveTimer = 0;
            
            // Check if aliens need to move down
            const aliveAliens = gameState.aliens.filter(a => a.alive);
            const leftmost = Math.min(...aliveAliens.map(a => a.x));
            const rightmost = Math.max(...aliveAliens.map(a => a.x));
            
            if ((gameState.alienDirection === 1 && rightmost >= 75) || 
                (gameState.alienDirection === -1 && leftmost <= 5)) {
                // Move down and change direction
                gameState.aliens.forEach(alien => {
                    if (alien.alive) alien.y++;
                });
                gameState.alienDirection *= -1;
            } else {
                // Move horizontally
                gameState.aliens.forEach(alien => {
                    if (alien.alive) alien.x += gameState.alienDirection;
                });
            }
        }
        
        // Update alien lasers with better collision detection
        gameState.alienLasers = gameState.alienLasers.filter(laser => {
            laser.y++;
            if (laser.y >= 20) return false;
            
            // Check for player hit with more forgiving collision
            const xDiff = Math.abs(laser.x - gameState.player.x);
            const yDiff = Math.abs(laser.y - 19);
            
            if (xDiff <= 1 && yDiff <= 0) {
                gameState.player.lives--;
                if (gameState.player.lives <= 0) {
                    gameState.gameOver = true;
                }
                return false;
            }
            return true;
        });
        
        // Aliens shoot randomly
        if (Math.random() < 0.05) {
            const shootingAliens = gameState.aliens.filter(a => a.alive);
            if (shootingAliens.length > 0) {
                const shooter = shootingAliens[Math.floor(Math.random() * shootingAliens.length)];
                gameState.alienLasers.push({ x: shooter.x, y: shooter.y + 1 });
            }
        }
        
        // Check win condition
        if (gameState.aliens.every(alien => !alien.alive)) {
            gameState.gameOver = true;
            gameState.victory = true;
        }
        
        // Check lose condition (aliens reach bottom)
        if (gameState.aliens.some(alien => alien.alive && alien.y >= 18)) {
            gameState.gameOver = true;
        }
        
        // Update display
        const gameContent = renderGame();
        const gameDiv = `
            <div style="color: var(--accent); margin-bottom: 10px;">
                🚀 SPACE INVADERS 👾 | Score: ${gameState.score} | Lives: ${gameState.player.lives}
            </div>
            <pre style="color: var(--text-primary); background: #000; padding: 10px; border: 1px solid var(--accent); line-height: 1; font-size: 12px;">${gameContent}</pre>
            <div style="color: var(--text-secondary); margin-top: 5px; font-size: 12px;">
                A/D: Move | SPACE: Shoot | Q: Quit
            </div>
        `;
        
        output.innerHTML = gameDiv;
        
        if (gameState.gameOver) {
            clearInterval(gameInterval);
            const endMessage = gameState.victory ? 
                `🎉 VICTORY! You saved Earth! Final Score: ${gameState.score}` :
                `💀 GAME OVER! Earth has been invaded! Final Score: ${gameState.score}`;
            
            output.innerHTML += `
                <div style="color: var(--accent); margin-top: 15px; font-size: 16px; text-align: center;">
                    ${endMessage}
                </div>
                <div style="color: var(--text-secondary); margin-top: 5px; text-align: center;">
                    Type 'invade' to play again!
                </div>
            `;
            gameState = null;
        }
    }

    /**
     * Available terminal commands
     * Each command is a function that returns a string response
     * or null for special commands (like clear and invade)
     */
    const commands = {
        help: () => 'Available commands: help, about, skills, joke, matrix, clear, invade, quit, whoami, ls, hack',
        about: () => 'Hi! I\'m Martin, a Computer Science student and Software Engineer.',
        skills: () => 'Java, Python, C++, Bash, System Administration, and more!',
        joke: () => {
            const jokes = [
                'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
                'Why did the programmer quit his job? Because he didn\'t get arrays! 📊',
                'What\'s a programmer\'s favorite hangout spot? The Foo Bar! 🍺',
                'How do you comfort a JavaScript bug? You console it! 🐞',
                'Why do Java developers wear glasses? Because they can\'t C# ! 👓'
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        },
        matrix: () => 'Wake up, Neo... The Matrix has you... Follow the white rabbit. 🐰',
        hack: () => 'Initiating hack sequence... Access granted. Welcome to the mainframe. 💀',
        whoami: () => 'martin-trenkov: Software Engineer, Creative Thinker, Matrix Enthusiast',
        ls: () => 'skills.txt  projects/  experience.log  secrets.hidden  README.md  space_invaders.exe',
        clear: () => {
            output.innerHTML = `
                <div style="color: var(--accent);">Welcome to Martin's Interactive Terminal!</div>
                <div style="color: var(--text-secondary);">Try commands: help, about, skills, joke, matrix, clear, invade</div>
                <div style="color: var(--text-secondary);">Type 'konami' for a surprise...</div>
            `;
            return null;
        },
        invade: () => {
            if (gameInterval) {
                clearInterval(gameInterval);
            }
            gameState = createGameState();
            output.innerHTML = `
                <div style="color: var(--accent); text-align: center; margin-bottom: 10px;">
                    🚀 INITIALIZING SPACE INVADERS 👾
                </div>
                <div style="color: var(--text-secondary); text-align: center; margin-bottom: 10px;">
                    Prepare to defend Earth!
                </div>
                <div style="color: var(--warning); text-align: center; margin-bottom: 15px;">
                    Use A/D to move, SPACE to shoot, Q to quit
                </div>
            `;
            
            setTimeout(() => {
                gameInterval = setInterval(updateGame, 120); // Slightly faster for smoother gameplay
                updateGame();
            }, 1000);
            return null;
        },
        spaceinvaders: () => commands.invade(), // Alias for backward compatibility
        quit: () => {
            if (gameState) {
                clearInterval(gameInterval);
                gameState = null;
                return '🚀 Game quit! Type "invade" to play again.';
            }
            return 'No game is currently running.';
        },
        konami: () => '🎮 KONAMI CODE ACTIVATED! You\'ve unlocked the secret developer mode! 🎮'
    };

    /**
     * Game Controls Event Listener
     * Handles keyboard input for Space Invaders game:
     * - A: Move left
     * - D: Move right
     * - Space: Shoot
     * - Q: Quit game
     */
    document.addEventListener('keydown', (e) => {
        if (!gameState || gameState.gameOver) return;
        
        switch (e.key.toLowerCase()) {
            case 'a':
                if (gameState.player.x > 0) {
                    gameState.player.x--;
                    e.preventDefault();
                }
                break;
            case 'd':
                if (gameState.player.x < 79) {
                    gameState.player.x++;
                    e.preventDefault();
                }
                break;
            case ' ':
                if (!gameState.playerLaser) {
                    gameState.playerLaser = { x: gameState.player.x, y: 18 };
                    e.preventDefault();
                }
                break;
            case 'q':
                if (gameState) {
                    const response = commands.quit();
                    output.innerHTML += `<div style="color: var(--text-secondary);">${response}</div>`;
                    e.preventDefault();
                }
                break;
        }
    });

    /**
     * Terminal Input Event Listener
     * Handles command input and execution
     * Displays command output in the terminal
     */
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.toLowerCase().trim();
            input.value = '';
            
            // Don't show command prompt if game is running
            if (!gameState) {
                output.innerHTML += `<div style="color: var(--accent);">guest@martin-portfolio:~$ ${cmd}</div>`;
            }
            
            // Execute command and show response if any
            const response = commands[cmd] ? commands[cmd]() : `Command not found: ${cmd}. Type 'help' for available commands.`;
            if (response !== null && response !== undefined) {
                output.innerHTML += `<div style="color: var(--text-secondary);">${response}</div>`;
            }
            
            // Scroll to bottom
            output.scrollTop = output.scrollHeight;
        }
    });
}