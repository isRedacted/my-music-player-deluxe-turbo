# My Music Player
A (work in progress) music player that does all the things *I* want it to do. Now DELUXE! And TURBO. Designed to be small and simple. Feel free to fork it or bug me if you want a certain feature!

(Screenshot and logo TBD)

# Planned Features
- M3U-based playlist organisation
	- Relative pathing for easy syncing using a service like [Syncthing](https://syncthing.net/)
- Supports MP3, M4A, FLAC, WAV, and more!
- Library browsing
- Background file monitoring for changes
- Last.fm integration
- Tag editing
- Free forever (like beer and speech)
	- I'm making this for fun and to improve my programming skills. I will never ever ever charge money for it or any of its features.
## On the "nice to have" list
- Android/iOS ports
- Bulk library file organisation (Organising into folders and renaming based on tags)
- Editable layout

# Installation
## Windows
**TBD**
## MacOS
**TBD**
## Linux
**TBD**
## From source
### Prerequisite
- [Node.JS](https://nodejs.org/en/download) (Developed with v22 but earlier versions probably work fine)
### Instructions
1. Clone with `git clone https://github.com/isRedacted/my-music-player-deluxe-turbo` or download the code from source
2. Open program folder root with terminal of choice
3. Run the following commands:
	- `npm install` to install libraries
	- `npx @tailwindcss/cli -i ./style.css -o ./pages/output.css` to convert the stylesheet into Tailwind CSS
	- `npm start` to start