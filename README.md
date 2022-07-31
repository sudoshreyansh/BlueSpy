# BlueSpy

BlueSpy is an Open Source Security Analysis Tool, works with GitHub, NPM and PyPi.

## Features

- **Popularity Score** <br />
Takes into account the repo's forks, stars, watches and downloads (for NPM and PyPi) to create a single score.
- **Metadata Analysis Score** <br />
Metadata analysis module consists of 13 tests, 3 for Typosquatting and 10 for analyzing metadata.
- **Static Source Analysis** <br />
Uses Regex patterns to find common functionalities of malicious programs - cryptography, network calls, file system I/O, OS calls and cryptocurrency demands.
- **BlueSpy score** <br />
It's an aggregated score of the previous 3 scores that helps  cluster packages into whether they are malicious or not. Generally, we found:
  - < 5: dangerous, 
  - 5-7: require manual code reviews before use,
  - 7+: can be considered safe.

## Usage

The backend server is a Docker container and requires GitHub Auth Token as an .env file:
```
GITHUB_AUTH_TOKEN=<TOKEN>
```
Then the image can be built and a container can be started listening on port 3000 using Docker:

```
docker build -t <IMAGE_NAME> .
docker run --rm -p 3000:3000 ---env-file=.env <IMAGE_NAME>
```

The frontend can be started using:
```
npm i && npm start
```
