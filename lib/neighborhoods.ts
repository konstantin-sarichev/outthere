// Complete NYC neighborhoods with coordinates across all boroughs

export interface Neighborhood {
  name: string
  borough: string
  lat: number
  lng: number
  zipCodes?: string[]
}

export const nycNeighborhoods: Neighborhood[] = [
  // MANHATTAN
  { name: "Upper East Side", borough: "Manhattan", lat: 40.7736, lng: -73.9566 },
  { name: "Upper West Side", borough: "Manhattan", lat: 40.7870, lng: -73.9754 },
  { name: "Midtown", borough: "Manhattan", lat: 40.7549, lng: -73.9840 },
  { name: "Times Square", borough: "Manhattan", lat: 40.7580, lng: -73.9855 },
  { name: "Hell's Kitchen", borough: "Manhattan", lat: 40.7648, lng: -73.9914 },
  { name: "Chelsea", borough: "Manhattan", lat: 40.7465, lng: -73.9972 },
  { name: "Greenwich Village", borough: "Manhattan", lat: 40.7335, lng: -74.0027 },
  { name: "SoHo", borough: "Manhattan", lat: 40.7230, lng: -74.0020 },
  { name: "Tribeca", borough: "Manhattan", lat: 40.7195, lng: -74.0089 },
  { name: "Financial District", borough: "Manhattan", lat: 40.7074, lng: -74.0113 },
  { name: "Lower East Side", borough: "Manhattan", lat: 40.7180, lng: -73.9875 },
  { name: "East Village", borough: "Manhattan", lat: 40.7265, lng: -73.9815 },
  { name: "Chinatown", borough: "Manhattan", lat: 40.7157, lng: -73.9970 },
  { name: "Little Italy", borough: "Manhattan", lat: 40.7193, lng: -73.9969 },
  { name: "NoLita", borough: "Manhattan", lat: 40.7220, lng: -73.9954 },
  { name: "Gramercy", borough: "Manhattan", lat: 40.7370, lng: -73.9835 },
  { name: "Flatiron District", borough: "Manhattan", lat: 40.7398, lng: -73.9895 },
  { name: "Union Square", borough: "Manhattan", lat: 40.7359, lng: -73.9911 },
  { name: "Murray Hill", borough: "Manhattan", lat: 40.7488, lng: -73.9788 },
  { name: "Kips Bay", borough: "Manhattan", lat: 40.7420, lng: -73.9789 },
  { name: "Turtle Bay", borough: "Manhattan", lat: 40.7513, lng: -73.9687 },
  { name: "Sutton Place", borough: "Manhattan", lat: 40.7587, lng: -73.9634 },
  { name: "Yorkville", borough: "Manhattan", lat: 40.7834, lng: -73.9493 },
  { name: "Carnegie Hill", borough: "Manhattan", lat: 40.7869, lng: -73.9595 },
  { name: "Lenox Hill", borough: "Manhattan", lat: 40.7688, lng: -73.9631 },
  { name: "Lincoln Square", borough: "Manhattan", lat: 40.7736, lng: -73.9831 },
  { name: "Columbus Circle", borough: "Manhattan", lat: 40.7681, lng: -73.9819 },
  { name: "Morningside Heights", borough: "Manhattan", lat: 40.8118, lng: -73.9626 },
  { name: "Hamilton Heights", borough: "Manhattan", lat: 40.8243, lng: -73.9468 },
  { name: "Washington Heights", borough: "Manhattan", lat: 40.8518, lng: -73.9351 },
  { name: "Inwood", borough: "Manhattan", lat: 40.8677, lng: -73.9212 },
  { name: "Harlem", borough: "Manhattan", lat: 40.8116, lng: -73.9465 },
  { name: "East Harlem", borough: "Manhattan", lat: 40.7957, lng: -73.9389 },

  // BROOKLYN
  { name: "Williamsburg", borough: "Brooklyn", lat: 40.7081, lng: -73.9571 },
  { name: "Greenpoint", borough: "Brooklyn", lat: 40.7311, lng: -73.9464 },
  { name: "Bushwick", borough: "Brooklyn", lat: 40.6944, lng: -73.9213 },
  { name: "Bedford-Stuyvesant", borough: "Brooklyn", lat: 40.6862, lng: -73.9411 },
  { name: "Crown Heights", borough: "Brooklyn", lat: 40.6676, lng: -73.9441 },
  { name: "Prospect Heights", borough: "Brooklyn", lat: 40.6743, lng: -73.9656 },
  { name: "Park Slope", borough: "Brooklyn", lat: 40.6728, lng: -73.9791 },
  { name: "Gowanus", borough: "Brooklyn", lat: 40.6736, lng: -73.9958 },
  { name: "Carroll Gardens", borough: "Brooklyn", lat: 40.6844, lng: -73.9984 },
  { name: "Cobble Hill", borough: "Brooklyn", lat: 40.6861, lng: -73.9961 },
  { name: "Brooklyn Heights", borough: "Brooklyn", lat: 40.6955, lng: -73.9937 },
  { name: "DUMBO", borough: "Brooklyn", lat: 40.7033, lng: -73.9889 },
  { name: "Downtown Brooklyn", borough: "Brooklyn", lat: 40.6892, lng: -73.9890 },
  { name: "Fort Greene", borough: "Brooklyn", lat: 40.6886, lng: -73.9743 },
  { name: "Clinton Hill", borough: "Brooklyn", lat: 40.6880, lng: -73.9659 },
  { name: "Boerum Hill", borough: "Brooklyn", lat: 40.6888, lng: -73.9932 },
  { name: "Red Hook", borough: "Brooklyn", lat: 40.6762, lng: -74.0052 },
  { name: "Sunset Park", borough: "Brooklyn", lat: 40.6415, lng: -74.0051 },
  { name: "Bay Ridge", borough: "Brooklyn", lat: 40.6259, lng: -74.0324 },
  { name: "Dyker Heights", borough: "Brooklyn", lat: 40.6169, lng: -74.0092 },
  { name: "Bensonhurst", borough: "Brooklyn", lat: 40.6013, lng: -73.9969 },
  { name: "Bath Beach", borough: "Brooklyn", lat: 40.5972, lng: -74.0050 },
  { name: "Gravesend", borough: "Brooklyn", lat: 40.5950, lng: -73.9664 },
  { name: "Sheepshead Bay", borough: "Brooklyn", lat: 40.5863, lng: -73.9441 },
  { name: "Coney Island", borough: "Brooklyn", lat: 40.5755, lng: -73.9707 },
  { name: "Brighton Beach", borough: "Brooklyn", lat: 40.5776, lng: -73.9614 },
  { name: "Flatbush", borough: "Brooklyn", lat: 40.6501, lng: -73.9496 },
  { name: "Midwood", borough: "Brooklyn", lat: 40.6195, lng: -73.9584 },
  { name: "Flatlands", borough: "Brooklyn", lat: 40.6277, lng: -73.9336 },
  { name: "Marine Park", borough: "Brooklyn", lat: 40.6042, lng: -73.9249 },
  { name: "Mill Basin", borough: "Brooklyn", lat: 40.6094, lng: -73.9089 },
  { name: "Bergen Beach", borough: "Brooklyn", lat: 40.6187, lng: -73.9089 },
  { name: "Canarsie", borough: "Brooklyn", lat: 40.6362, lng: -73.9016 },
  { name: "East New York", borough: "Brooklyn", lat: 40.6694, lng: -73.8825 },
  { name: "Brownsville", borough: "Brooklyn", lat: 40.6627, lng: -73.9109 },
  { name: "Ocean Hill", borough: "Brooklyn", lat: 40.6784, lng: -73.9093 },
  { name: "Cypress Hills", borough: "Brooklyn", lat: 40.6866, lng: -73.8773 },

  // QUEENS
  { name: "Long Island City", borough: "Queens", lat: 40.7505, lng: -73.9364 },
  { name: "Astoria", borough: "Queens", lat: 40.7720, lng: -73.9301 },
  { name: "Sunnyside", borough: "Queens", lat: 40.7434, lng: -73.9218 },
  { name: "Woodside", borough: "Queens", lat: 40.7458, lng: -73.9059 },
  { name: "Jackson Heights", borough: "Queens", lat: 40.7557, lng: -73.8831 },
  { name: "Elmhurst", borough: "Queens", lat: 40.7424, lng: -73.8820 },
  { name: "Corona", borough: "Queens", lat: 40.7498, lng: -73.8631 },
  { name: "Flushing", borough: "Queens", lat: 40.7674, lng: -73.8328 },
  { name: "College Point", borough: "Queens", lat: 40.7867, lng: -73.8448 },
  { name: "Whitestone", borough: "Queens", lat: 40.7948, lng: -73.8187 },
  { name: "Bayside", borough: "Queens", lat: 40.7685, lng: -73.7693 },
  { name: "Little Neck", borough: "Queens", lat: 40.7625, lng: -73.7291 },
  { name: "Douglaston", borough: "Queens", lat: 40.7648, lng: -73.7454 },
  { name: "Fresh Meadows", borough: "Queens", lat: 40.7341, lng: -73.7808 },
  { name: "Hillcrest", borough: "Queens", lat: 40.7214, lng: -73.8007 },
  { name: "Jamaica", borough: "Queens", lat: 40.7006, lng: -73.8063 },
  { name: "Jamaica Estates", borough: "Queens", lat: 40.7172, lng: -73.7834 },
  { name: "Hollis", borough: "Queens", lat: 40.7112, lng: -73.7624 },
  { name: "Queens Village", borough: "Queens", lat: 40.7267, lng: -73.7454 },
  { name: "Bellerose", borough: "Queens", lat: 40.7245, lng: -73.7180 },
  { name: "St. Albans", borough: "Queens", lat: 40.6967, lng: -73.7624 },
  { name: "Cambria Heights", borough: "Queens", lat: 40.6955, lng: -73.7344 },
  { name: "Laurelton", borough: "Queens", lat: 40.6719, lng: -73.7489 },
  { name: "Rosedale", borough: "Queens", lat: 40.6625, lng: -73.7365 },
  { name: "Far Rockaway", borough: "Queens", lat: 40.6034, lng: -73.7532 },
  { name: "Rockaway Beach", borough: "Queens", lat: 40.5895, lng: -73.8153 },
  { name: "Arverne", borough: "Queens", lat: 40.5920, lng: -73.7932 },
  { name: "Broad Channel", borough: "Queens", lat: 40.6088, lng: -73.8187 },
  { name: "Howard Beach", borough: "Queens", lat: 40.6573, lng: -73.8420 },
  { name: "Ozone Park", borough: "Queens", lat: 40.6797, lng: -73.8441 },
  { name: "South Ozone Park", borough: "Queens", lat: 40.6723, lng: -73.8131 },
  { name: "Richmond Hill", borough: "Queens", lat: 40.6956, lng: -73.8312 },
  { name: "Kew Gardens", borough: "Queens", lat: 40.7073, lng: -73.8312 },
  { name: "Forest Hills", borough: "Queens", lat: 40.7214, lng: -73.8448 },
  { name: "Rego Park", borough: "Queens", lat: 40.7264, lng: -73.8618 },
  { name: "Middle Village", borough: "Queens", lat: 40.7181, lng: -73.8803 },
  { name: "Ridgewood", borough: "Queens", lat: 40.7006, lng: -73.9062 },
  { name: "Glendale", borough: "Queens", lat: 40.7006, lng: -73.8803 },
  { name: "Maspeth", borough: "Queens", lat: 40.7267, lng: -73.9098 },

  // BRONX
  { name: "Mott Haven", borough: "Bronx", lat: 40.8176, lng: -73.9235 },
  { name: "Port Morris", borough: "Bronx", lat: 40.8067, lng: -73.9187 },
  { name: "Hunts Point", borough: "Bronx", lat: 40.8081, lng: -73.8826 },
  { name: "Longwood", borough: "Bronx", lat: 40.8167, lng: -73.8969 },
  { name: "Melrose", borough: "Bronx", lat: 40.8267, lng: -73.9145 },
  { name: "Morrisania", borough: "Bronx", lat: 40.8388, lng: -73.9067 },
  { name: "Tremont", borough: "Bronx", lat: 40.8501, lng: -73.8984 },
  { name: "Mount Hope", borough: "Bronx", lat: 40.8448, lng: -73.9198 },
  { name: "High Bridge", borough: "Bronx", lat: 40.8398, lng: -73.9298 },
  { name: "Concourse", borough: "Bronx", lat: 40.8267, lng: -73.9198 },
  { name: "Fordham", borough: "Bronx", lat: 40.8601, lng: -73.8984 },
  { name: "University Heights", borough: "Bronx", lat: 40.8584, lng: -73.9134 },
  { name: "Morris Heights", borough: "Bronx", lat: 40.8501, lng: -73.9198 },
  { name: "Kingsbridge", borough: "Bronx", lat: 40.8751, lng: -73.9067 },
  { name: "Riverdale", borough: "Bronx", lat: 40.8984, lng: -73.9084 },
  { name: "Fieldston", borough: "Bronx", lat: 40.8867, lng: -73.9067 },
  { name: "Spuyten Duyvil", borough: "Bronx", lat: 40.8784, lng: -73.9187 },
  { name: "Marble Hill", borough: "Bronx", lat: 40.8751, lng: -73.9098 },
  { name: "Kingsbridge Heights", borough: "Bronx", lat: 40.8667, lng: -73.8984 },
  { name: "Bedford Park", borough: "Bronx", lat: 40.8734, lng: -73.8901 },
  { name: "Norwood", borough: "Bronx", lat: 40.8784, lng: -73.8784 },
  { name: "Woodlawn", borough: "Bronx", lat: 40.8951, lng: -73.8651 },
  { name: "Wakefield", borough: "Bronx", lat: 40.9001, lng: -73.8551 },
  { name: "Williamsbridge", borough: "Bronx", lat: 40.8784, lng: -73.8667 },
  { name: "Eastchester", borough: "Bronx", lat: 40.8901, lng: -73.8284 },
  { name: "Baychester", borough: "Bronx", lat: 40.8734, lng: -73.8384 },
  { name: "Co-op City", borough: "Bronx", lat: 40.8734, lng: -73.8284 },
  { name: "Pelham Bay", borough: "Bronx", lat: 40.8551, lng: -73.8284 },
  { name: "Country Club", borough: "Bronx", lat: 40.8384, lng: -73.8084 },
  { name: "Throgs Neck", borough: "Bronx", lat: 40.8167, lng: -73.8284 },
  { name: "Westchester Square", borough: "Bronx", lat: 40.8384, lng: -73.8434 },
  { name: "Morris Park", borough: "Bronx", lat: 40.8501, lng: -73.8601 },
  { name: "Van Nest", borough: "Bronx", lat: 40.8451, lng: -73.8667 },
  { name: "Belmont", borough: "Bronx", lat: 40.8584, lng: -73.8884 },
  { name: "Crotona Park", borough: "Bronx", lat: 40.8384, lng: -73.8884 },
  { name: "Claremont", borough: "Bronx", lat: 40.8384, lng: -73.9067 },
  { name: "Soundview", borough: "Bronx", lat: 40.8167, lng: -73.8734 },
  { name: "Castle Hill", borough: "Bronx", lat: 40.8234, lng: -73.8501 },
  { name: "Parkchester", borough: "Bronx", lat: 40.8334, lng: -73.8584 },

  // STATEN ISLAND
  { name: "St. George", borough: "Staten Island", lat: 40.6434, lng: -74.0776 },
  { name: "Tompkinsville", borough: "Staten Island", lat: 40.6367, lng: -74.0776 },
  { name: "Stapleton", borough: "Staten Island", lat: 40.6267, lng: -74.0776 },
  { name: "Clifton", borough: "Staten Island", lat: 40.6234, lng: -74.0676 },
  { name: "Port Richmond", borough: "Staten Island", lat: 40.6334, lng: -74.1376 },
  { name: "West Brighton", borough: "Staten Island", lat: 40.6434, lng: -74.1176 },
  { name: "New Brighton", borough: "Staten Island", lat: 40.6501, lng: -74.0976 },
  { name: "Livingston", borough: "Staten Island", lat: 40.6334, lng: -74.0976 },
  { name: "Mariners Harbor", borough: "Staten Island", lat: 40.6434, lng: -74.1576 },
  { name: "Arlington", borough: "Staten Island", lat: 40.6167, lng: -74.1076 },
  { name: "Graniteville", borough: "Staten Island", lat: 40.6367, lng: -74.1476 },
  { name: "Bulls Head", borough: "Staten Island", lat: 40.6267, lng: -74.1676 },
  { name: "Bloomfield", borough: "Staten Island", lat: 40.6067, lng: -74.1776 },
  { name: "Travis", borough: "Staten Island", lat: 40.5967, lng: -74.2076 },
  { name: "Chelsea", borough: "Staten Island", lat: 40.5867, lng: -74.2176 },
  { name: "Tottenville", borough: "Staten Island", lat: 40.5067, lng: -74.2376 },
  { name: "Pleasant Plains", borough: "Staten Island", lat: 40.5167, lng: -74.2176 },
  { name: "Princess Bay", borough: "Staten Island", lat: 40.5234, lng: -74.2076 },
  { name: "Woodrow", borough: "Staten Island", lat: 40.5334, lng: -74.1976 },
  { name: "Huguenot", borough: "Staten Island", lat: 40.5434, lng: -74.1876 },
  { name: "Arden Heights", borough: "Staten Island", lat: 40.5534, lng: -74.1776 },
  { name: "Annadale", borough: "Staten Island", lat: 40.5367, lng: -74.1676 },
  { name: "Eltingville", borough: "Staten Island", lat: 40.5567, lng: -74.1676 },
  { name: "Great Kills", borough: "Staten Island", lat: 40.5634, lng: -74.1576 },
  { name: "Bay Terrace", borough: "Staten Island", lat: 40.5734, lng: -74.1476 },
  { name: "Richmondtown", borough: "Staten Island", lat: 40.5734, lng: -74.1176 },
  { name: "New Dorp", borough: "Staten Island", lat: 40.5734, lng: -74.1076 },
  { name: "Oakwood", borough: "Staten Island", lat: 40.5834, lng: -74.1176 },
  { name: "South Beach", borough: "Staten Island", lat: 40.5934, lng: -74.0776 },
  { name: "Midland Beach", borough: "Staten Island", lat: 40.5734, lng: -74.0876 },
  { name: "Dongan Hills", borough: "Staten Island", lat: 40.5967, lng: -74.0976 },
  { name: "Emerson Hill", borough: "Staten Island", lat: 40.6067, lng: -74.0876 },
  { name: "Todt Hill", borough: "Staten Island", lat: 40.6067, lng: -74.1176 },
  { name: "Castleton Corners", borough: "Staten Island", lat: 40.6167, lng: -74.1376 },
  { name: "Westerleigh", borough: "Staten Island", lat: 40.6267, lng: -74.1276 },
  { name: "Willowbrook", borough: "Staten Island", lat: 40.6034, lng: -74.1376 },
]

// Helper function to get neighborhoods by borough
export function getNeighborhoodsByBorough(borough: string): Neighborhood[] {
  return nycNeighborhoods.filter(n => n.borough === borough)
}

// Helper function to get all borough names
export function getBoroughs(): string[] {
  return Array.from(new Set(nycNeighborhoods.map(n => n.borough)))
}

// Helper function to search neighborhoods
export function searchNeighborhoods(query: string): Neighborhood[] {
  return nycNeighborhoods.filter(n => 
    n.name.toLowerCase().includes(query.toLowerCase()) ||
    n.borough.toLowerCase().includes(query.toLowerCase())
  )
}

// Helper function to get coordinates
export function getNeighborhoodCoordinates(neighborhoodName: string): { lat: number, lng: number } | null {
  const neighborhood = nycNeighborhoods.find(n => n.name === neighborhoodName)
  return neighborhood ? { lat: neighborhood.lat, lng: neighborhood.lng } : null
}

// Organized by borough for easy selection
export const neighborhoodsByBorough = {
  Manhattan: getNeighborhoodsByBorough('Manhattan'),
  Brooklyn: getNeighborhoodsByBorough('Brooklyn'),
  Queens: getNeighborhoodsByBorough('Queens'),
  Bronx: getNeighborhoodsByBorough('Bronx'),
  'Staten Island': getNeighborhoodsByBorough('Staten Island')
} 