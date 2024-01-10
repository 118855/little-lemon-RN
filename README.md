# Little Lemon App

This is a React Native App using Expo.
The application was originally developed using JavaScript, but is now moving to TypeScript.

Main features:

- Registration: Sign in with email verification
- Home screen with a list of dishes in a SectionList
- Search by the name of a dish with the Searchbar component
- Search by category with a custom component (CategoryList)
- Profile screen with user data saving functionality

## Technologies used

- React Native
- Atomic design
- AsyncStorage
- SQLite
- Expo

## Screenshots

<table>
  <tr>
    <td>
      <p>Login Screen</p>
      <img src="./little-lemon/assets/screenshots/login.png" alt="Login screen" title="Login screen" width="200px"/>
    </td>
    <td>
      <p>Main Screen</p>
      <img src="./little-lemon/assets/screenshots/main.png" alt="Main screen" title="Main screen" width="200px"/>
    </td>
    <td>
      <p>Profile Screen</p>
      <img src="./little-lemon/assets/screenshots/profile.png" alt="Profile screen" title="Profile screen" width="200px"/>
    </td>
  </tr>
  <tr>
    <td>
      <p>Search by Category</p>
      <img src="./little-lemon/assets/screenshots/searchCategory.png" alt="Search by category" title="Search by category" width="200px"/>
    </td>
    <td>
      <p>Search by Name</p>
      <img src="./little-lemon/assets/screenshots/search.png" alt="Search" title="Search by name" width="200px"/>
    </td>
  </tr>
</table>

Planned:

- Moving the styles object to a separate file
- Implementing network layer
- Integrating MobX for State Management
