
# 🎮 Emoji Tic-Tac-Toe — Vanishing Edition

A creative and playful twist on the classic Tic-Tac-Toe game! This is a 2-player game where emojis replace the traditional Xs and Os, and a unique **“vanishing emoji”** rule keeps the board dynamic and ever-changing.

---

## 🧠 Objective

Build a 2-player web-based game inspired by Tic-Tac-Toe, using **emojis instead of Xs and Os**, and introducing a **"vanishing" rule** for enhanced gameplay dynamics.

---

## ⚙️ Tech Stack

- **HTML5** – Structure and layout
- **CSS3** – Styling and responsiveness
- **JavaScript (ES6)** – Game logic and state management

---

## 🎲 Game Rules — In Detail

### 1. 🧱 Board Structure
- The game board is a 3×3 grid.
- The grid starts empty.
- Each player can only have **3 active emojis** on the board at any time.

### 2. 😀 Emoji Categories
- Each player selects a category before the game begins.
- Example categories:
  - **Animals**: 🐶 🐱 🐵 🐰  
  - **Food**: 🍕 🍟 🍔 🍩  
  - **Sports**: ⚽️ 🏀 🏈 🎾  
- On their turn, a player is assigned a **random emoji** from their chosen category.

### 3. 🔁 Turn-Based Play
- The game starts with **Player 1**, followed by **Player 2**, alternating every turn.
- Players can place their emoji on any available cell.

### 4. 💨 Vanishing Rule
- Only **3 emojis per player** can exist on the board simultaneously.
- When a player places a **4th emoji**, their **oldest emoji disappears** (FIFO logic).
- The new emoji **cannot be placed on the cell where the oldest one was**.
- The board updates visually to reflect the change.

### 5. 🏆 Winning Condition
- A player wins by aligning **3 of their own emojis** in a row:
  - Horizontally, vertically, or diagonally
- All three winning emojis must belong to **the same player category**.

### 6. 🔚 Game Ending
- The game continues until one player wins.
- Draws are **not possible** (board never fully fills).
- Upon winning:
  - A **“Player X Wins!”** message is displayed.
  - A **“Play Again”** button resets the game.

---

## 📂 Project Structure
emoji-tic-tac-toe/
├── index.html # HTML markup
├── style.css # Styling and layout
└── script.js # Game logic and emoji management


