1. What is Google Earth Engine?
Google Earth Engine (GEE) is a platform for cloud-based geospatial analysis using satellite data. It allows you to analyze environmental changes across the globe.

2. Importance of Satellite Data
Satellite data helps monitor forests, urban areas, floods, fires, and more. It is vital for decision-making, planning, and environmental management.

3. Real-world Applications of GEE
Deforestation tracking
Urban growth analysis
Water body monitoring
Disaster risk mapping

```js
// On 21st February 2019, massive forest fires broke out in
// numerous places across the Bandipur National Park of
// the Karnataka state in India.
// By 25 February 2019 most fire was brought under control
// This script shows how to do damage assessment using
// spectral index change detection technique.

// Define the area of interest
var geometry = ee.Geometry.Polygon([[
  [76.37639666685044, 11.766523239445169],
  [76.37639666685044, 11.519036946599561],
  [76.78426409849106, 11.519036946599561],
  [76.78426409849106, 11.766523239445169]
]]);
var fireStart = ee.Date('2019-02-20');
var fireEnd = ee.Date('2019-02-25');

Map.centerObject(geometry, 10)

var s2 = ee.ImageCollection("COPERNICUS/S2")


// Apply filters 
var filtered = s2
  .filter(ee.Filter.bounds(geometry))
  .select('B.*')

// Load the Cloud Score+ collection
var csPlus = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');
var csPlusBands = csPlus.first().bandNames();

// We need to add Cloud Score + bands to each Sentinel-2
// image in the collection
// This is done using the linkCollection() function
var filteredS2WithCs = filtered.linkCollection(csPlus, csPlusBands);

// Function to mask pixels with low CS+ QA scores.
function maskLowQA(image) {
  var qaBand = 'cs';
  var clearThreshold = 0.5;
  var mask = image.select(qaBand).gte(clearThreshold);
  return image.updateMask(mask);
}


var filteredMasked = filteredS2WithCs
  .map(maskLowQA);

// Create Before and After composites
var before = filteredMasked
  .filter(ee.Filter.date(
    fireStart.advance(-2, 'month'), fireStart))
  .median()

var after = filteredMasked
  .filter(ee.Filter.date(
    fireEnd, fireEnd.advance(1, 'month')))
  .median()

// Freshly burnt regions appeat bright in SWIR-bands
// Use a False Color Visualization
var swirVis = {
  min: 0.0,
  max: 3000,
  bands: ['B12', 'B8', 'B4'],
};
Map.addLayer(before.clip(geometry), swirVis, 'Before')
Map.addLayer(after.clip(geometry), swirVis, 'After')

// Write a function to calculate  Normalized Burn Ratio (NBR)
// 'NIR' (B8) and 'SWIR-2' (B12)
var addNBR = function(image) {
  var nbr = image.normalizedDifference(['B8', 'B12']).rename(['nbr']);
  return image.addBands(nbr)
}

var beforeNbr = addNBR(before).select('nbr');
var afterNbr = addNBR(after).select('nbr');

var nbrVis = {min: -0.5, max: 0.5, palette: ['white', 'black']}

Map.addLayer(beforeNbr.clip(geometry), nbrVis, 'Prefire NBR');
Map.addLayer(afterNbr.clip(geometry), nbrVis, 'Postfire NBR');

// Calculate Change in NBR (dNBR)
var change = beforeNbr.subtract(afterNbr)

// Apply a threshold
var threshold = 0.3

// Display Burned Areas
var burned = change.gt(threshold)
Map.addLayer(burned.clip(geometry), {min:0, max:1, palette: ['white', 'red']}, 'Burned', false) 

```

4. GEE for Beginners (No Coding Needed!)
You can use Earth Engine Apps and explore maps without writing a single line of code. This makes GEE accessible to everyone.