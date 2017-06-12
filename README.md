# Backupstagram

Tool for backing up your Instagram account including photos, videos, descriptions, dates, likes, and comment counts.

**Tested on Mac OS X, should work on Mac/Win/Lin ( be sure to [submit an issue](https://github.com/AlexBezuska/backupstagram/issues) if you find compatibility problems!)**

## Prerequisites

- Node.js
  - [Install Node.js](https://nodejs.org/en/)

- Git (optional)
	- [https://git-scm.com/](https://git-scm.com/)
  
## Installation

- In your terminal clone this github repo `git clone git@github.com:AlexBezuska/Backupstagram.git` (git required)
	
	**or** Download the zip of the project [Backupstagram Zip](https://github.com/AlexBezuska/Backupstagram/archive/master.zip) (git not required)
- Install dependencies
	- In your terminal, inside the folder for this project run `npm install`, this will download all the projects required packages from NPM (Node Package Manager)


## How to use

- Duplicate `config-sample.json` and name it `config.json`

- add your Instagram username to `config.json` and save it.

- Commands (run in your terminal while inside the root of the `backupstagram` directory)
	 - **`npm start`** - Saves all of your Instagram posts to a new directory inside of the backupsFolder` specified in `config.json`
    - Media such as photos and videos is stored in a folder named `media`.
    - A file named `metadata.json` is created with all the dates, descriptions, like counts, comment counts, and links to the media both locally and on Instagram.

## Feature requests

- Fix the dependency on my weird fork of the 'instagram-screen-scrape' with the carousel fix in it
- Change the `comments` in metadata to be an array of comments, commenter names, and if possible dates
- Update the date to save timestamp as well as year/month/day
- Add a handlebars template to view all of your media on a webpage in the browser


## Contributing

If you are interested in participating in this project, please feel free to send a bug or feature request by [submitting an issue](https://github.com/AlexBezuska/backupstagram/issues), or submit a PR for me to review.

## Versioning

Backupstagram project uses [SemVer](http://semver.org/) for versioning.

## Authors

* **[Alex Bezuska](https://github.com/AlexBezuska)** - *Initial work*

See also the list of [contributors](https://github.com/AlexBezuska/backupstagram/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.TXT](LICENSE.TXT) file for details
