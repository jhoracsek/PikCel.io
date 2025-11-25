<p align="center">
<img style="width:100%;"src="https://github.com/jhoracsek/PikCel.io/raw/master/images/githubbanner.png"/>
</p>

# PiKCEL.io

PiKCEL.io is a turn-based multiplayer strategy game built for the browser. Players take turns placing pixels on a shared grid, expanding their territory while blocking opponents from doing the same. When your timer runs out, you lose.

This project started as a personal experiment in real-time multiplayer game development and evolved into a full online experience with matchmaking, private rooms, simple bots, and a custom UI.

To play, or find more information about gameplay visit [PiKCEL.io](https://pikcel.io/)!

## Gameplay Overview

- Start by entering your name.
- Create a **private room**, join an existing room via **Room ID**, or play against bots.
- On your turn, you can:
  - Place pixels on **adjacent blank tiles** to grow your territory.
  - Strategically block opponents from expanding.
- Each turn:
  - You receive a **limited number of pixels to place**, given as a random number between 3 and 8.
  - Additionally, a **timer** begins, run out of time and you lose.
- Last player standing wins.

The UI also includes:
- A **“How to play” panel** with animated GIF examples.
- An **Announcements** section for release notes and updates.
- An **About** section with links for feedback and contact.

## Tech Stack

**Frontend**

- **JavaScript** (no framework, game loop via Phaser)
- **[Phaser](https://phaser.io/)** – rendering, scenes, tweens, graphics.
- **HTML / CSS** – custom splash screen, waiting room, chat window, and layout.
- **Socket.io Client** – for communication with the server.

**Backend**

- **Node.js** server with **Socket.io**
- Room management, player assignment, basic bot logic.

## Getting Started

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
# Clone the repo
git clone https://github.com/<your-username>/PikCel.io.git

cd PikCel.io

# Install dependencies
npm install

# Start the server
node server.js
```

Then you can simply open the client through your browser by going to http://localhost:3000.
