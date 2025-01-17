# Astronauts Project
> [!WARNING]
> This project requires Node.js to run rather than p5.js, readline functionality can be replaced with prompt to change this.
### Task 1:
**Update and Display Astronaut Details**
- Write a function to update the days in space for a specific astronaut and then display all astronauts’ details.

### Task 2:
**Add a New Astronaut and Calculate Total Days in Space**
- Write a function to add a new astronaut to the list and then calculate the total number of days spent in space by all astronauts.

### Task 3:
**Retrieve and Display Astronauts by Spacecraft**
- Write a function to retrieve astronauts by their spacecraft and display their details.

## Extra features
> [!NOTE]
> Everything below these tasks are additional features implemented outside the project requirements.
> Most of these are quality of life tweaks rather than full features, as I've focused more on ensuring that the code itself and the input/output for the user is polished.

**Menu implementation**
- Added a menu within the `main()` function
- This allows the user to specify which action they would like to do, and is looped back to once a task is complete
- This also handles incorrect inputs with a default switch case

**Format functions**
- Added the functions `formatName(astronautName)` and `formatSpacecraft(spacecraftInput)`
- Added `findMatchingAstronauts(input)` as a helper function
- These allow the user to enter only parts of names in any case for them to be recognised and handled correctly
- These also handle errors where there are either no results or multiple results, giving the user a helpful response with suggestions

**Display functions**
- Added the functions `displaySpecificAstronauts(astronauts)`, `displayAllAstronauts(highlight)` and `displayAvailableSpacecraft()`
- Added `sortAstronauts(astronauts, sortByDays)` as a helper function
- These help display the details of astronauts in various ways, allowing specific astronauts to be specified or by displaying all of them at once
- The `displayAvailableSpacecraft()` function is used before a user inputs a spacecraft (whether searching or creating) to provide a list of all the spacecrafts currently in the dataset
- The function to display all astronauts also allows a `highlight` parameter, which (if not `undefined`) will add an arrow `<---` next to the highlighted individual (to highlight changes made by the user)
- The sort function is used to sort the details of astronauts by alphabetical order, or by the total days an astronaut has spent on a spacecraft

## Screenshots

<table>
  <tr>
    <td>
      <h4>Updating an astronaut with their first name (task 1)</h4>
      <img src="https://github.com/user-attachments/assets/7c2c5dad-a453-469e-af8d-e8c8ef31a313" alt="Updating an astronaut with their first name" width="400"/>
    </td>
    <td>
      <h4>Updating an astronaut using part of their surname (task 1)</h4>
      <img src="https://github.com/user-attachments/assets/bd08c633-96dd-4294-9b64-07f7151fed9e" alt="Updating an astronaut using part of their surname" width="400"/>
    </td>
  </tr>
  <tr>
    <td>
      <h4>Adding an astronaut onto a new spacecraft (task 2)</h4>
      <img src="https://github.com/user-attachments/assets/0990ccec-5ea1-4955-9987-c9f6e7f6b069" alt="Adding an astronaut onto a new spacecraft" width="400"/>
    </td>
    <td>
      <h4>Retrieving all astronauts from a specific spacecraft (task 3)</h4>
      <img src="https://github.com/user-attachments/assets/4cb755c7-9e53-4080-b910-54ffc89a6f97" alt="Retrieving all astronauts from a specific spacecraft" width="400"/>
    </td>
  </tr>
</table>
