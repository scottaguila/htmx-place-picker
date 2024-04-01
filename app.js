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
  // Returns location item, which HTMX will target to the "My Dream Locations" section
  res.send(renderLocation(location, false));
});

// Receives DELETE request with locationId and
// removes it from INTERESTING_LOCATIONS
app.delete('/places/:id', (req, res) => {
  const locationId = req.params.id;
  const locationIndex = INTERESTING_LOCATIONS.findIndex(
    loc => loc.id === locationId
  );
  INTERESTING_LOCATIONS.splice(locationIndex, 1);
  // Sends back empty response, which will replace the
  // element that sent the DELETE request
  res.send();
});

app.listen(3000);
