import React, { useState } from 'react';

const Reaction = () => {
  const [reactions, setReactions] = useState([
    { id: 0, name: "Send Gmail Mail", description: "Send a mail to someone on gmail", logo: require('../../assets/gmail-icon.png') },
    // { id: 1, name: "Send Outlook Mail", description: "Send a mail to someone on outlook", logo: require('../../assets/outlook-icon.png') },
    { id: 5, name: "Send Mail To Self", description: "Send a mail to yourself", logo: require('../../assets/mail-icon.png') },
    { id: 2, name: "Create Google Docs", description: "Create a new google document", logo: require('../../assets/google-docs-icon.png') },
    { id: 3, name: "Create Github Fork", description: "Create a forked repository", logo: require('../../assets/github-icon.png') },
    { id: 4, name: "Create Github Issue", description: "Create a new issue on a set repo", logo: require('../../assets/github-icon.png') },
  ]);

  return [
    reactions,
    setReactions
  ];
};

export default Reaction;