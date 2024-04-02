import express from 'express';

import { AVAILABLE_LOCATIONS } from './data/available-locations.js';
import renderLocationsPage from './views/index.js';
import renderLocation from './views/components/location.js';

const app = express();

const INTERESTING_LOCATIONS = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Receives GET request and renders locations page
// with updated lists of available and interesting locations
app.get('/', (req, res) => {
  // An array containing all locations NOT in INTERESTING_LOCATIONS
  const availableLocations = AVAILABLE_LOCATIONS.filter(
    location => !INTERESTING_LOCATIONS.includes(location)
  );
  res.send(renderLocationsPage(availableLocations, INTERESTING_LOCATIONS));
});

// Receives POST request with locationId and
// pushes it to INTERESTING_LOCATIONS
app.post('/places', (req, res) => {
  const locationId = req.body.locationId;
  // Returns location with matching id
  const location = AVAILABLE_LOCATIONS.find(loc => loc.id === locationId);
  INTERESTING_LOCATIONS.push(location);

  const availableLocations = AVAILABLE_LOCATIONS.filter(
    location => !INTERESTING_LOCATIONS.includes(location)
  );
  // Returns location item, which HTMX will target to the "My Dream Locations" section
  res.send(`
    ${renderLocation(location, false)}

    <ul 
      id="available-locations" 
      class="locations" 
      hx-swap-oob="true">
      ${availableLocations.map(location => renderLocation(location)).join('')}
    </ul>
  `);
});

// Receives DELETE request with locationId and
// removes it from INTERESTING_LOCATIONS
app.delete('/places/:id', (req, res) => {
  const locationId = req.params.id;
  const locationIndex = INTERESTING_LOCATIONS.findIndex(
    loc => loc.id === locationId
  );

  // Removes location from INTERESTING_LOCATIONS
  INTERESTING_LOCATIONS.splice(locationIndex, 1);

  // Updates available locations after removing above location
  // from INTERESTING_LOCATIONS
  const availableLocations = AVAILABLE_LOCATIONS.filter(
    location => !INTERESTING_LOCATIONS.includes(location)
  );

  // Note that hx-swap-oob means the button that sent the DELETE
  // request is still receiving an empty response.
  res.send(`
    <ul 
      id="available-locations" 
      class="locations" 
      hx-swap-oob="true">
      ${availableLocations.map(location => renderLocation(location)).join('')}
    </ul>
  `);
});

app.listen(3000);
