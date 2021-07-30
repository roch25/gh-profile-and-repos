## GitHub - Search users and respositories

https://gh-search-users-repos.netlify.app

<img src = "https://gh-search-users-repos.netlify.app/icons8-github-48.png"   width=50/> 

- Search users
- Search repositories
- Display user's repositories (Language, number of forks, number of stargazers)

The application opens with a search box and lists of popular users and repositories.
- https://api.github.com/repositories 
- https://api.github.com/users

![s1](./readme-pics/1.png)

Upon entering text into the search box, the users and repositories matching the search string are fetched and displayed using 
https://api.github.com/search/users?q= and 
https://api.github.com/search/repositories?q=

User's details are fetched using https://api.github.com/users/:username
![s2](./readme-pics/2.png)

Upon clicking on a user's repositories (from users list), their repositories are displayed. 
![s3](./readme-pics/3.png)

And finally, you can search through the user's repositories (Impl using JavaScript's array methods)
![s4](./readme-pics/4.png)

Styling using CSS - flexbox, grid
