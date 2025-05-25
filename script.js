class TwistedTicTacToe {
    constructor() {
        this.emojiCategories = {
            animals: ['🐶', '🐱', '🐵', '🐰'],
            food: ['🍕', '🍟', '🍔', '🍩'],
            sports: ['⚽', '🏀', '🏈', '🎾'],
            nature: ['🌸', '🌺', '🌻', '🌹']
        };
        
        this.gameState = {
            currentPlayer: 1,
            player1Category: null,
            player2Category: null,
            board: Array(9).fill(null),
            player1Emojis: [],
            player2Emojis: [],
            gameActive: false,
            winner: null
        };
        
        this.playerSelections = {
            player1: null,
            player2: null
        };
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategorySelection(e));
        });
        
        document.getElementById('startGameBtn').addEventListener('click', () => this.startGame());
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.resetGame());
    }
    
    handleCategorySelection(e) {
        const categoryBtn = e.currentTarget;
        const category = categoryBtn.dataset.category;
        const playerCard = categoryBtn.closest('.player-card');
        const player = playerCard.dataset.player;
        
        playerCard.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        categoryBtn.classList.add('selected');
        this.playerSelections[`player${player}`] = category;
        this.checkStartGameAvailability();
    }
    
    checkStartGameAvailability() {
        const startBtn = document.getElementById('startGameBtn');
        startBtn.disabled = !(this.playerSelections.player1 && this.playerSelections.player2);
    }
    
    startGame() {
        if (this.playerSelections.player1 === this.playerSelections.player2) {
            alert('Players must choose different emoji categories!');
            return;
        }
        
        this.gameState = {
            currentPlayer: 1,
            player1Category: this.playerSelections.player1,
            player2Category: this.playerSelections.player2,
            board: Array(9).fill(null),
            player1Emojis: [],
            player2Emojis: [],
            gameActive: true,
            winner: null
        };
        
        document.getElementById('categorySelection').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'block';
        this.updateGameInfo();
        this.updateNextEmoji();
    }
    
    getRandomEmoji(player) {
        const category = player === 1 ? this.gameState.player1Category : this.gameState.player2Category;
        const emojis = this.emojiCategories[category];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }
    
    handleCellClick(e) {
        if (!this.gameState.gameActive) return;
        
        const cellIndex = parseInt(e.currentTarget.dataset.index);
        const cell = e.currentTarget;
        
        if (this.gameState.board[cellIndex] !== null) return;
        
        const currentPlayer = this.gameState.currentPlayer;
        const emoji = this.getRandomEmoji(currentPlayer);
        const playerEmojis = currentPlayer === 1 ? this.gameState.player1Emojis : this.gameState.player2Emojis;
        
        if (playerEmojis.length >= 3) {
            const oldestEmoji = playerEmojis.shift();
            const oldCell = document.querySelector(`[data-index="${oldestEmoji.position}"]`);
            
            if (cellIndex === oldestEmoji.position) {
                alert('Cannot place emoji where your oldest emoji was located!');
                return;
            }
            
            oldCell.classList.add('vanish');
            setTimeout(() => {
                oldCell.textContent = '';
                oldCell.classList.remove('vanish');
                this.gameState.board[oldestEmoji.position] = null;
            }, 400);
        }
        
        this.gameState.board[cellIndex] = { player: currentPlayer, emoji: emoji };
        playerEmojis.push({ emoji: emoji, position: cellIndex, player: currentPlayer });
        
        cell.textContent = emoji;
        cell.classList.add('placed');
        setTimeout(() => cell.classList.remove('placed'), 400);
        
        if (this.checkWinner()) {
            this.gameState.winner = currentPlayer;
            this.gameState.gameActive = false;
            this.highlightWinningLine();
            setTimeout(() => this.showWinnerModal(), 1000);
            return;
        }
        
        this.gameState.currentPlayer = this.gameState.currentPlayer === 1 ? 2 : 1;
        this.updateGameInfo();
        this.updateNextEmoji();
    }
    
    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            const cellA = this.gameState.board[a];
            const cellB = this.gameState.board[b];
            const cellC = this.gameState.board[c];
            
            if (cellA && cellB && cellC && 
                cellA.player === cellB.player && 
                cellB.player === cellC.player) {
                this.winningCombination = combination;
                return true;
            }
        }
        return false;
    }
    
    highlightWinningLine() {
        if (this.winningCombination) {
            this.winningCombination.forEach(index => {
                document.querySelector(`[data-index="${index}"]`).classList.add('winning');
            });
        }
    }
    
    updateGameInfo() {
        document.getElementById('player1Count').textContent = this.gameState.player1Emojis.length;
        document.getElementById('player2Count').textContent = this.gameState.player2Emojis.length;
        
        document.querySelector('.turn-text').textContent = `Player ${this.gameState.currentPlayer}'s Turn`;
        
        document.getElementById('player1Info').classList.toggle('active', this.gameState.currentPlayer === 1);
        document.getElementById('player2Info').classList.toggle('active', this.gameState.currentPlayer === 2);
    }
    
    updateNextEmoji() {
        if (this.gameState.gameActive) {
            document.getElementById('nextEmoji').textContent = 
                this.getRandomEmoji(this.gameState.currentPlayer);
        }
    }
    
    showWinnerModal() {
        document.getElementById('winnerText').textContent = `Player ${this.gameState.winner} Wins!`;
        document.getElementById('winnerModal').style.display = 'flex';
    }
    
    resetGame() {
        document.getElementById('winnerModal').style.display = 'none';
        
        this.gameState = {
            currentPlayer: 1,
            player1Category: null,
            player2Category: null,
            board: Array(9).fill(null),
            player1Emojis: [],
            player2Emojis: [],
            gameActive: false,
            winner: null
        };
        
        this.playerSelections = {
            player1: null,
            player2: null
        };
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning', 'placed', 'vanish');
        });
        
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        document.getElementById('categorySelection').style.display = 'block';
        document.getElementById('gameContainer').style.display = 'none';
        document.getElementById('startGameBtn').disabled = true;
        
        document.getElementById('player1Info').classList.remove('active');
        document.getElementById('player2Info').classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TwistedTicTacToe();
});