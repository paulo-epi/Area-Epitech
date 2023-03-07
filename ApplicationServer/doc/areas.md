# Action and Reactions json

## Actions

### Received a mail from x

```json
{
    "adress":"exemple@mail.com"
}
```

### Received a message from x

```json
{
    "username":"Exemple#1234"
}
```

### Received a message like x

```json
{
    "message":"This is a text message"
}
```

### New github issue

```json
{
    "repo_name":"GithubOwner/RepositoryName"
}
```

### New github star

```json
{
    "repo_name":"GithubOwner/RepositoryName"
}
```

### New push github

```json
{
    "repo_name":"GithubOwner/RepositoryName"
}
```

### New github fork

```json
{
    "repo_name":"GithubOwner/RepositoryName"
}
```

## Reactions

### Send a mail

```json
{
    "adress":"exemple@mail.net",
    "subject":"Title/Object of mail",
    "message":"Content of the mail"
}
```

### Send a mail to self

```json
{
    "subject":"Title/Object of mail",
    "message":"Content of the mail"
}
```

### Create a document

```json
{
    "title":"Title",
    "content":"Content of the document"
}
```

### Create an issue

```json
{
    "repo_name":"GithubOwner/RepositoryName",
    "issue": {
        "title":"Title of the issue",
        "body":"Body of the issue"
    }
}
```

### Create a fork

```json
{
    "repo_name":"GithubOwner/RepositoryName"
}
```
