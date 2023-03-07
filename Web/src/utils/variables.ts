import { IInput } from "../components/ActionSelect/FieldInput";

export const url = "http://127.0.0.1:8080/";
// useful command : google-chrome --disable-web-security --user-data-dir="../../../../../Desktop/Chrome/"
// launch serv (Fedora) : ./index.py

export const defaultActionInputs: IInput[] = [
  {
    id: "1",
    name: "received a mail from x on gmail",
    titles: ["From who (mail address)"],
    ids: ["adress"],
    values: [""],
  },
  {
    id: "2",
    name: "received a mail from x",
    titles: ["From who (mail address)"],
    ids: ["adress"],
    values: [""],
  },
  {
    id: "5",
    name: "received a message from x",
    titles: ["From who (username)"],
    ids: ["username"],
    values: [""],
  },
  {
    id: "6",
    name: "received a message like x",
    titles: ["Message"],
    ids: ["message"],
    values: [""],
  },
  {
    id: "7",
    name: "new github issue",
    titles: ["Name of the repository"],
    ids: ["repo_name"],
    values: [""],
  },
  {
    id: "8",
    name: "new github star",
    titles: ["Name of the repository"],
    ids: ["repo_name"],
    values: [""],
  },
  {
    id: "12",
    name: "new github fork",
    titles: ["Name of the repository"],
    ids: ["repo_name"],
    values: [""],
  },
  {
    id: "13",
    name: "new github push",
    titles: ["Name of the repository"],
    ids: ["repo_name"],
    values: [""],
  },
];

export const defaultReactionInputs: IInput[] = [
  {
    id: "0",
    name: "send a mail on gmail",
    titles: ["Mail address", "Subject", "Message"],
    ids: ["adress", "subject", "message"],
    values: ["", "", ""],
  },
  {
    id: "1",
    name: "send a mail",
    titles: ["Mail address", "Subject", "Message"],
    ids: ["adress", "subject", "message"],
    values: ["", "", ""],
  },
  {
    id: "2",
    name: "create a document",
    titles: ["Title", "Content"],
    ids: ["title", "content"],
    values: ["", ""],
  },
  {
    id: "3",
    name: "create a fork",
    titles: ["Name of the repository"],
    ids: ["repo_name"],
    values: [""],
  },
  {
    id: "4",
    name: "create an issue",
    titles: [
      "Name of the repository",
      "Title of the issue",
      "Body of the issue",
    ],
    ids: ["repo_name", "title", "body"],
    values: ["", "", ""],
  },
  {
    id: "5",
    name: "send a mail to self",
    titles: ["Subject", "Message"],
    ids: ["subject", "message"],
    values: ["", ""],
  },
];

// actions :
// 0: Object { id: 0, name: "detect weather", desc: "detect if the weather is bad", … }
// 1: Object { id: 1, name: "received a mail from x on gmail", desc: "user received a mail from someone on gmail", … }
// 2: Object { id: 2, name: "received a mail from x", desc: "user received a mail from someone", … }
// 3: Object { id: 3, name: "event in google calendar", desc: "an event in the user's google calendar is starting now", … }
// 4: Object { id: 4, name: "event in calendar", desc: "an event in the user's calendar is starting now", … }
// 5: Object { id: 5, name: "received a message from x", desc: "the user received a private message from someone", … }
// 6: Object { id: 6, name: "received a message like x", desc: "the user received a message looking like an inputed text", … }
// 7: Object { id: 7, name: "new github issue", desc: "a new issue has appeared on a set github repo", … }
// 8: Object { id: 8, name: "new github star", desc: "a set repo has received a new star", … }
// 9: Object { id: 9, name: "detect temperature", desc: "detect if the temperature is under 0", … }
// 10: Object { id: 10, name: "received a new mail on outlook", desc: "user received a new mail on outlook", … }
// 11: Object { id: 11, name: "received a new mail on gmail", desc: "user received a new mail on gmail", … }
// 12: Object { id: 12, name: "new github fork", desc: "a set repo has received a new fork", … }
// 13: Object { id: 13, name: "new github push", desc: "ba set repo has received a new push", … }

// réactions :
// 0: Object { id: 0, name: "send a mail on gmail", desc: "send a mail to someone on gmail", … }
// 1: Object { id: 1, name: "send a mail", desc: "send a mail to someone", … }
// 2: Object { id: 2, name: "create a document", desc: "create a new google document", … }
// 3: Object { id: 3, name: "create a fork", desc: "create a forked repository", … }
// 4: Object { id: 4, name: "create an issue", desc: "create a new issue on a set repo", … }
// 5: Object { id: 5, name: "send a mail to self", desc: "send a mail to yourself", … }
