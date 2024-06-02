# Contributing

Here are all of the steps you should follow whenever contributing to this repo!

## Environment Variables
- `NEXT_PUBLIC_API_URL`: http://localhost:3000/api/example
- `MONGO_URI`: MONGO_URI=mongodb+srv://username:password@cluster0.sqkzahu.mongodb.net/ccwfp?retryWrites=true&w=majority    
- `AWS_ACCESS_KEY_ID`:
- `AWS_SECRET_ACCESS_KEY`:

## Setup and Deployment
### Local Development
1. Install all required packages: `npm i`
2. Add all of the required environment variables into `.env`
3. To run the project, run this command: `npm run dev`

### Deployment Process
- For the team developing in 2023-2024, we were not able to deploy yet but ask about deployment steps from the directors of engineering of H4I. Vercel and AWS is necessary.

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
- When reviewing PR's, sometimes code features work on a developer's end and not another's so make sure the URL string for the `.env` matches and is correct
- Add a New Client
  - Write later
- Profile Page
  - Authentication is tricky since we are only using MongoDB credentials in the database
  - Write more later

## Future Improvements
- Generate Report Page
  - The nonprofit needs to generate a report for themselves and the county for the number of clients who showed up at the food pantry
  - See the Figma for the design and the current implementation
- Edit and Delete an Existing Client
  - The pencil icon will show a modal popup that allows the employee/user to edit the client's information or even delete them
  - See the Figma for the design

## Contact Information

Tech Lead: Hope Yim (hopieyimmie@gmail.com, 360-787-1445)

Nonprofit: Angela Dalebout (daleboutk@mac.com, 714-308-3603)



