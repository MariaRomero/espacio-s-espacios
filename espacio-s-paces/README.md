This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

- I have created the app using Firebase for the database.
- Jest and react testing library for test.
- Other libraries like react gesture gallery to be able to deliver the required solution.

I have deployed the App using Firebase Hosting

You can view the deployed version at https://espacio-s-paces.firebaseapp.com/

Users can create spaces by filling the form on the main page, images need to be uploaded using their url addresses separated by a ","
Users can update spaces
Users can expire spaces by pressing the 'Update space' button and then the 'Expire space' button, which will set the time stamp on the space to the previous day.

Ways to Improve it

- Add authentication
- Have a pipeline for deployment (like Circle Ci)
- Integrate with firebase storage in order to accept image files for uploads instead of urls
- Higher test coverage including end 2 end tests
- Should have turned the button into a component to make it more reusable
- Add more breakpoints to media queries.
- Clear messaging system to give the user feedback after certain actions.
- Should have implemented some UI change for when the space has been expired to make it more obvious to the users.
