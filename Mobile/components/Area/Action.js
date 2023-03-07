import React, { useState } from 'react';

const Action = () => {
  const [actions, setActions] = useState([
    { id: 0, name: "Bad Weather", description: "Detect if the weather is bad", logo: require('../../assets/weather-icon.png') },
    { id: 9, name: "Weather Temperature", description: "Detect if the temperature is under 0", logo: require('../../assets/weather-icon.png') },
    { id: 1, name: "Gmail Mail from X", description: "User received a mail from someone on gmail", logo: require('../../assets/gmail-icon.png') },
    { id: 11, name: "Gmail Mail", description: "User received a new mail on gmail", logo: require('../../assets/gmail-icon.png') },
    // { id: 2, name: "Outlook Mail from X", description: "User received a mail from someone on outlook", logo: require('../../assets/outlook-icon.png') },
    // { id: 10, name: "Outlook Mail", description: "User received a new mail on outlook", logo: require('../../assets/outlook-icon.png') },
    { id: 3, name: "Google Calendar", description: "An event in the user's google calendar is starting now", logo: require('../../assets/google-calendar-icon.png') },
    // { id: 4, name: "Calendar", description: "An event in the user's calendar is starting now", logo: require('../../assets/calendar-icon.png') },
    // { id: 5, name: "Discord Message", description: "The user received a private message from someone", logo: require('../../assets/discord-icon.png') },
    // { id: 6, name: "Discord Like", description: "The user received a message looking like an inputed text", logo: require('../../assets/discord-icon.png') },
    { id: 7, name: "Github Issue", description: "A new issue has appeared on a set github repo", logo: require('../../assets/github-icon.png') },
    { id: 8, name: "Github Star", description: "A set repo has received a new star", logo: require('../../assets/github-icon.png') },
    { id: 12, name: "Github Fork", description: "A set repo has received a new fork", logo: require('../../assets/github-icon.png') },
    { id: 13, name: "Github Push", description: "A set repo has received a new push", logo: require('../../assets/github-icon.png') },
  ]);

  return [
    actions,
    setActions
  ];
};

export default Action;