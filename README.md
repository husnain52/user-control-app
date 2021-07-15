# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)





<!-----------------------------------Redux JS  --------------------------------------------->

Redux JS is javascript library that is used for state management throughout the application (globally). You can set a state anywhere, you can get a state data anywhere in the application.
First run command 'npm i react-redux' install redux-thunk also.
Redux Thunk is middleware that allows you to return functions, rather than just actions, within Redux. This allows for delayed actions, including working with promises.

<!-- structure -->
Setting up Redux in an App:
<!-- (there are many ways this on is how I do) -->
1- Create a folder 'redux' in src directory.

2- Create a store.js file. (It holds a createStore function, that combines the reducers, initialized it, hold the initial states. Redux JS contains a single store only. For more see component)

3- Create a reducers.js file. (It holds a main function of update_state-reducer, and a reducers object that combines all reducers in single state and send it to combine reducer function from redux. For more see component.)

4- Create actions.js file. (It includes the actions, when triggered gets/updates value from state and exports it to store. For more see the component.)

5- Create a types.js file. (It only includes REDUX ACTION TYPES and export them. Most of users dont use it but I belive it's a good practice:)

<!-- uaage -->
Once done structure, ready to use the redux in your app:

1- Go to your App.js file. Import <Provider> from redux.
2- Import The useStore function in from store file in redux folder.
3- Wrap your application components in Provider and send value of store as prop (the useStore function'main store').
<!-- in components -->
4- In the meant component, import the action(function) from src/redux/actions.js
5- You will use 'useDispatch' function, send it the imported function(triggers) with the value to be updated with i.e it can be ana data, number, boolean etc .
6- To access any state, you will be using a useSelector method from rect-redux, approach wanted state and store it in a constant.
7- Now, constant stores the initial value/updated value.