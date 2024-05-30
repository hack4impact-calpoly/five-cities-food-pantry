# Contributing

Here are all of the steps you should follow whenever contributing to this repo!

## Environment Variables
- `NEXT_PUBLIC_API_URL`:
- `MONGO_URI`:
- `AWS_ACCESS_KEY_ID`:
- `AWS_SECRET_ACCESS_KEY`:

## Setup and Deployment
### Local Development
1. Install all required packages: `npm i`
2. Add all of the required environment variables into `.env`
3. To run the project, run this command: `npm run dev`

### Deployment Process

## Making Changes

1. Before you start making changes, always make sure you're on the main branch, then `git pull` and `npm i` to make sure your code is up to date
2. Create a branch `git checkout -b <name-of-branch>`
3. Make changes to the code
4. `npm run lint` to ensure code standards. (running `npm run lint:fix` will fix most of the styling errors)

## Commiting Changes

When interacting with Git/GitHub, feel free to use the command line, VSCode extension, or Github desktop. These steps assume you have already made a branch using `git checkout -b <branch-name>` and you have made all neccessary code changes for the provided task.

1. View diffs of each file you changed using the VSCode Github extension (3rd icon on far left bar of VSCode) or GitHub Desktop
2. `git add .` (to stage all files) or `git add <file-name>` (to stage specific file)
3. `git commit -m "<type>[optional scope]: <description>"` or
   `git commit -m "<type>[optional scope]: <description>" -m "[optional body]"` or
   `git commit` to get a message prompt
4. `git push -u origin <name-of-branch>`

## Making Pull Requests

1. Go to the Pull Requests tab on [github.com](https://github.com/)
2. Find your PR, fill out the PR template
3. (If applicable, provide a screenshot of your work in the comment area)
4. Link your PR to the corresponding **Issue**
5. Request a reviewer to check your code
6. Once approved, your code is ready to be merged in 🎉

## Known Issues and Limitations

## Future Improvements

## Contact Information

Tech Lead: Hope Yim (hopieyimmie@gmail.com, 360-787-1445)

Nonprofit: Angela Dalebout (daleboutk@mac.com, 714-308-3603)



