# Getting Started

1. Clone the repo with git clone
2. Run `npm install` in the project root to build
3. Run `npm run build:release`

This outputs the build to ./extension which you can import into chrome by opening [chrome://extensions](chrome://extensions), enabling developer apps, and dropping this extension in. 

# Contributing

If you do not have access to lds.org you can still develop and test your code! 

Use `npm run server` to run a local server that hosts a skeleton page at [localhost](http://localhost:80/).

Join our discord @ [discord](https://discord.gg/grwHJyU) to get the latest and talk to other devs.

# Next Steps

 + Better FTUE with setting data
 + Reparse current page if settings change
 + Cache offenders instead of refetching per page load
 + Move off web scraping ASAP
 + Firefox? Edge?
