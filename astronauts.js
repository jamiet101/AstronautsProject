import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin, output: process.stdout
});

const CRAFT_INDEX = 0;
const NAME_INDEX = 1;
const DAYS_INDEX = 2;

let all_astronauts = [['ISS', 'Sergey Prokopyev', 176], ['ISS', 'Dmitry Petelin', 176], ['ISS', 'Frank Rubio', 176], ['Tiangong', 'Fei Junlong', 112], ['Tiangong', 'Deng Qingming', 107], ['Tiangong', 'Zhang Lu', 107], ['ISS', 'Stephen Bowen', 54], ['ISS', 'Warren Hoburg', 14], ['ISS', 'Sultan Al Neyadi', 14], ['ISS', 'Andrey Fedyaev', 14]];

function main() {
  rl.question(`[1] Update astronaut details and display all astronauts\n[2] Add a new astronaut and calculate total days of all astronauts\n[3] Retrieve and display astronauts by their spacecraft\n[4] Display all astronauts\nEnter option: `, option => {
    switch (parseInt(option)) {
      case 1:
        task1();
        break;
      case 2:
        task2();
        break;
      case 3:
        task3();
        break;
      case 4:
        displayAstronautsTask();
        break;
      default:
        console.log(option + ' is an invalid choice, please try again');
        main();
        break;
    }
  });
}

function task1() {
  rl.question('\nEnter the name of the astronaut to update: ', astronautInput => {
    try {
      const astronautIndex = formatName(astronautInput);
      const astronautName = all_astronauts[astronautIndex][NAME_INDEX];
      const currentDaysInSpace = parseInt(all_astronauts[astronautIndex][DAYS_INDEX]);
      console.log(astronautName + ' currently has ' + currentDaysInSpace + ' days in space');
      rl.question('Enter the new number of days in space: ', newDaysInSpace => {
        all_astronauts[astronautIndex][DAYS_INDEX] = parseInt(newDaysInSpace);
        console.log('\nUpdated astronaut details:');
        displayAllAstronauts(astronautIndex);
        console.log('');
        main();
      });
    } catch (error) {
      console.error(error.message);
      console.log('');
      main();
    }
  });
}

function task2() {
  displayAvailableSpacecraft();
  rl.question('\nEnter the spacecraft name: ', spacecraftInput => {
    const spacecraft = formatSpacecraft(spacecraftInput);
    rl.question('Enter the astronaut name: ', astronautName => {
      rl.question('Enter the number of days in space: ', daysInSpace => {
        if (isNaN(Number(daysInSpace)) || daysInSpace.trim() === '') {
          console.error('Error: Days in space must be a valid number.');
          console.log('');
          main();
        } else {
          all_astronauts.push([spacecraft, astronautName, parseInt(daysInSpace)]);
          console.log('New astronaut added.\n');

          displayAllAstronauts();

          const totalDays = calculateTotalDaysInSpace();
          console.log('\nTotal days spent by all astronauts: ' + totalDays + '\n');

          main();
        }
      });
    });
  });
}

function task3() {
  displayAvailableSpacecraft();
  rl.question('\nEnter the name of the spacecraft to retrieve astronauts: ', spacecraftInput => {
    try {
      const spacecraft = formatSpacecraft(spacecraftInput);
      const astronautsInCraft = all_astronauts.filter(astronaut => astronaut[CRAFT_INDEX] === spacecraft);
      if (astronautsInCraft.length > 0) {
        console.log(`Astronauts in ${spacecraft}:`);
        displaySpecificAstronauts(astronautsInCraft);
      } else {
        console.log(`No astronauts found in spacecraft: ${spacecraft}`);
      }
      console.log('');
      main();
    } catch (error) {
      console.error(error.message);
      console.log('');
      main();
    }
  });
}

function displayAstronautsTask() {
  console.log('\nAll astronaut details:');
  displayAllAstronauts();
  console.log('');
  main();
}

function formatName(astronautName) {
  const matches = findMatchingAstronauts(astronautName);

  if (matches.length === 0) {
    throw new Error(`No astronauts found matching: ${astronautName}`);
  }

  if (matches.length > 1) {
    const suggestions = matches.map(m => all_astronauts[m][NAME_INDEX]).join(', ');
    throw new Error(`Multiple matches found: ${suggestions}. Please be more specific.`);
  }

  return matches[0];
}

function formatSpacecraft(spacecraftInput) {
  const spacecrafts = all_astronauts.map(astronaut => astronaut[CRAFT_INDEX]);
  const uniqueSpacecrafts = [...new Set(spacecrafts)];
  const lowerCaseInput = spacecraftInput.toLowerCase();
  const match = uniqueSpacecrafts.find(craft => craft.toLowerCase() === lowerCaseInput);

  return match ? match : spacecraftInput;
}

function findMatchingAstronauts(input) {
  const searchTerms = input.toLowerCase().split(/\s+/);
  const matches = [];

  for (let i = 0; i < all_astronauts.length; i++) {
    const nameParts = all_astronauts[i][NAME_INDEX].toLowerCase().split(' ');

    if (searchTerms.every(term => nameParts.some(part => part.includes(term)))) {
      matches.push(i);
    }
  }

  return matches;
}

function calculateTotalDaysInSpace() {
  return all_astronauts.reduce((total, astronaut) => total + astronaut[DAYS_INDEX], 0);
}

function sortAstronauts(astronauts, sortByDays) {
  return astronauts.sort((a, b) => {
    if (sortByDays) {
      return b[DAYS_INDEX] - a[DAYS_INDEX];
    } else {
      // compare by craft
      if (a[CRAFT_INDEX] < b[CRAFT_INDEX]) return -1;
      if (a[CRAFT_INDEX] > b[CRAFT_INDEX]) return 1;

      // split name
      const aNameParts = a[NAME_INDEX].split(' ');
      const bNameParts = b[NAME_INDEX].split(' ');

      const aLastName = aNameParts[aNameParts.length - 1];
      const bLastName = bNameParts[bNameParts.length - 1];

      // compare by last name
      if (aLastName < bLastName) return -1;
      if (aLastName > bLastName) return 1;

      const aFirstName = aNameParts[0];
      const bFirstName = bNameParts[0];

      // compare by first name
      if (aFirstName < bFirstName) return -1;
      if (aFirstName > bFirstName) return 1;

      // compare by total days in space (descending)
      return b[DAYS_INDEX] - a[DAYS_INDEX];
    }
  });
}

function displaySpecificAstronauts(astronauts) {
  astronauts.forEach(astronaut => {
    console.log(`Craft: ${astronaut[CRAFT_INDEX]}, Name: ${astronaut[NAME_INDEX]}, Days in space: ${astronaut[DAYS_INDEX]}`);
  });
}

function displayAllAstronauts(highlight) {
  const sortedAstronauts = sortAstronauts([...all_astronauts], true);
  if (highlight === undefined) {
    sortedAstronauts.forEach(astronaut => {
      console.log(`Craft: ${astronaut[CRAFT_INDEX]}, Name: ${astronaut[NAME_INDEX]}, Days in space: ${astronaut[DAYS_INDEX]}`);
    });
  } else {
    const originalHighlightAstronaut = all_astronauts[highlight];
    const newHighlightIndex = sortedAstronauts.findIndex(astronaut => astronaut[CRAFT_INDEX] === originalHighlightAstronaut[CRAFT_INDEX] && astronaut[NAME_INDEX] === originalHighlightAstronaut[NAME_INDEX] && astronaut[DAYS_INDEX] === originalHighlightAstronaut[DAYS_INDEX]);

    sortedAstronauts.forEach((astronaut, index) => {
      const highlightMarker = (index === newHighlightIndex) ? ' <---' : '';
      console.log(`Craft: ${astronaut[CRAFT_INDEX]}, Name: ${astronaut[NAME_INDEX]}, Days in space: ${astronaut[DAYS_INDEX]}${highlightMarker}`);
    });
  }
}

function displayAvailableSpacecraft() {
  const spacecrafts = all_astronauts.map(astronaut => astronaut[CRAFT_INDEX]);
  const uniqueSpacecrafts = [...new Set(spacecrafts)];
  console.log('Available spacecraft: ' + uniqueSpacecrafts.join(', '));
}

main();