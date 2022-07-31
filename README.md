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

