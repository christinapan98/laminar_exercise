## App functionality

The app uses a two-column layout that lets users adjust filters while viewing charts and scrolling through the dataset. This design keeps the controls and visualizations accessible at all times.

Aggregate metrics are computed based on the currently filtered subset of data (defaulting to the full dataset). This allows users to gain more meaningful insights by seeing how metrics change as filters are applied.

## Tech Stack

This project is built with React and TypeScript to provide a flexible component-based architecture with strong type safety. TypeScript helps catch potential issues early, especially when working with dynamic or inconsistent JSON data.

For data visualization, the project uses MUI Charts, chosen for its clean API, React integration, and compatibility with the broader MUI component ecosystem.

## Areas for extension

This app currently simulates a dashboard where data is readily available on the frontend. In a real-world scenario, data would likely be fetched from a server via API calls. To handle future async behavior, it'd be helpful to implement a loading state that displays while data is being fetched. An error state would be useful as well, which I would implement using React error boundaries.

Pagination could also be added to improve performance and usability when working with large datasets, making it easier for users to navigate and explore extensive data entries.

Further improvements include componetizing the bar chart to include the title along with the chart component, as well as componetizing the filters.

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
