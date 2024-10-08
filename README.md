# Road to Glory Football Management Web App

## Overview

This web application is designed to help users organize and manage their teams within custom communities. It offers functionality for users to create their own football ecosystems, organizing leagues, managing teams, participate in online tournaments, and simulate a real-world football manager experience.

This tool allows it's communities to simulate an online Career Mode in an EA Sports videogame, a player mode that, unfortunately, it still doesn't exists as of today.

***This is my first real project and is currently under development, so it's still unfinished and missing lots of functionalities, at the same time that is not yet properly polished. Even though the UI is not yet properly adapted, it has been temporary focused to be displayed on mobile devices, not providing a proper experience on larger devices.*** Please, for any questions or suggestions, feel free to reach me out.

## Features

- **Community Creation**: Users can create their own communities with unique rules, competition formats, and team properties.
- **Team Management**: Each user is assigned as the manager of a fictional football team. They will be able to choose the club they would like to use ingame, but that only provides their club crest and kits, not their players. 
- **Player Transfers**: Users can buy and sell players from the market or from other users to improve their teams. Each community can have its own market and rules for handling transfers.
- **Tournaments and Leagues**: The platform supports the creation of different tournament styles, like leagues, elimination brackets or others, ensuring organized gameplay.
- **Fixtures and Calendars**: The app dynamically generates fixtures based on the selected tournament format. Matchdays and splits are visually displayed, ensuring an easy-to-follow structure for users.
- **Game Integration**: After forming their teams, users will play any assigned game building that team in the videogame and organizing an online match against their rival, with the results being used to update the standings and stats in the web app.
- **Budget Management**: A detailed budget system that lets managers track their spending on player transfers, prizes and bonuses or penalties.
- **Admin Tools**: Community administrators have access to a suite of tools to manage users, set up tournaments, handle disputes, and adjust community rules as needed.

## Technical Stack

- **Front-end**: The web application is developed using **Angular 18**, utilizing **Angular Material** for UI components.
- **Back-end**: A **Node.js** and **MongoDB** stack is employed to create and manage the app endpoints.
- **Deployment**: The web app is currently hosted using free tiers in **Netlify** and **Render.com**. Please, bear in mind that this can cause some delays when starting to use the app due to Render free tier downtime.
- **Web**: https://road2glory.netlify.app/

## Key Components

- **Community Page**: Displays the community’s settings, teams, tournaments, and admin tools, along with the latest updates and news.
- **Team Manager**: Allows users to view and manage their teams, including liberating their players to recover some funds.
- **Tournament Fixtures**: Displays all tournament matchdays and splits dynamically, showing match results and standings in a user-friendly layout.
- **Transfer Market**: Provides a marketplace where users can view available players and buy them. Currently, there is only the option of instant buying, however, a bidding system will be introduced soon.

## Future Enhancements

- **Team and Player Stats**: The app will include the options for each community if they want a deeper stat recording, adding player and team statistics to the game results formulary.
- **Device Optimization**: While the app is built primarily for mobilep, upcoming updates will include better desktop and larger devices responsiveness and optimization.
- **Enhanced Admin Tools**: Expanding the community admin's control with more customizable options for rules, match setups, and community member management.