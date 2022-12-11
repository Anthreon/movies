# React movie library application

Find your favourite movie and add it to your own movie library.

This project was created with React framework
Check package.json for used packages

Project consists of three main pages: Entry page, Favourite movies page and Movie detail page.
On Entry page you can search for your favourite movie and click on any movie card to open Movie detail page for
specific movie.
On Movie detail page its up to you if you add movie to your favourite movies with star icon or remove it from favourite movies.

From Entry page you can visit favourite movies with link in right top corner.

Application is divided into several folders:

In assets you find used images.

Components folder consists all used components accross app.

In custom hooks folder there is useDebounce hook for reducing number API calls wen searching for movie

In routing folder you will find MainRoutes which is whole routing for application

There are three context files in store folder. favourite movies context is used for handling logic of adding and removing favourite movies
as well as fetching them from local storage.
Scroll history context is used for keeping scroll history for currently existing pages.
Search context holds search input which user typed into input field.

Types folder contains shared interfaces which are used across app.

Util folder contains constants, helper functions which could be used anywhere and http file containing fetching logic of movies.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
