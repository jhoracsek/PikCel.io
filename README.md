<p align="center">
<img style="width:100%;"src="https://github.com/jhoracsek/PikCel.io/raw/master/images/githubbanner.png"/>
</p>

# PiKCEL.io

PiKCEL.io is a turn-based multiplayer strategy game built for the browser. Players take turns placing pixels on a shared grid, expanding their territory, while trying to block opponents from doing the same. When your timer runs out, you lose.

This project started as a personal experiment in real-time multiplayer game development and evolved into a full online experience with private rooms, simple bots, and a custom UI.

To play, or find more information about gameplay visit [PiKCEL.io](https://pikcel.io/)!

## Gameplay Overview

- Start by entering your name.
- You can either, 
  - Create a **private room** and send your **Room ID** to your friends,  
  - join an existing room via **Room ID**,
  - or play against bots.
- On your turn, you can:
  - Place pixels on **adjacent blank tiles** to grow your territory.
  - Strategically block opponents from expanding.
- Each turn:
  - You receive a **limited number of pixels to place**, given as a random number between 3 and 8.
  - Additionally, a **timer** begins, run out of time and you lose.
- Last player standing wins.

The UI also includes:
- A **“How to play” panel** with animated GIF examples demonstrating gameplay.
- An **Announcements** section for any release notes and or updates.
- An **About** section with some basic information about the game.
- A link for bug submissions and contact information.

## Tech Stack

**Frontend**

- **JavaScript** - No framework, game loop via Phaser.
- **[Phaser](https://phaser.io/)** – Rendering, scenes, tweens, graphics.
- **HTML / CSS** – Custom splash screen, waiting room, chat window, and layout.
- **Socket.io Client** – For communication with the server.

**Backend**

- **Node.js** server with **Socket.io**
- Room management, player assignment, basic bot logic.

## Development

### Getting Started

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
# Clone the repo
git clone https://github.com/jhoracsek/PikCel.io.git

cd PikCel.io

# Install dependencies
npm install

# Start the server
node server.js
```

Then you can simply open the client through your browser by going to http://localhost:3000.


### Project Structure

```bash
.
├── images/               # Image assets used by the game
├── node_modules/
├── res/                  # CSS styling
├── src/        
│   ├── Game.js           # Main Phaser scene
│   ├── Grid.js           # Grid construction, layout logic
│   ├── Main.js           # Bootstrap and Phaser config
│   ├── Menu.js           # Menu and waiting room logic
│   ├── Pixel.js          # Single 'Pixel'/board tile
│   ├── PlayerBadges.js   # UI component for player name boxes
│   ├── helpers.js        # Utility functions
│   └── net.js            # Client-side networking (Socket.IO events and syncing)
├── .gitignore
├── README.md
├── index.html            # Main webpage
├── package-lock.json
├── package.json          # Project dependencies
├── phaser.min.js         # Phaser game engine
└── server.js             # Node.js server
```
