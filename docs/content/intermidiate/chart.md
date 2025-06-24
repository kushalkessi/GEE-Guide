# **Charts in Google Earth Engine**
In Google Earth Engine, **charts** are visual tools used to analyze and display geospatial data trends and statistics over time or space. The platform integrates with the [**Google Charts**](https://developers.google.com/chart), allowing users to create interactive and customizable charts such as **Line Charts, Scatter Charts, Histograms, and Bar Charts**. Commonly, the `ui.Chart.image.series()` function is used to plot time-series data like average NDVI values over a specified period. These charts can be customized with options to adjust line thickness, point size, axis labels, gridlines, date formats, and series styles using the `.setOptions()` method. Charting in Earth Engine helps visualize complex data efficiently, combining filtering, mapping, reducing, and cloud-masking operations.

---
### Step 1. Load the aoi and cloud mask Sentinel 2 imagery
```js
// Date Range
var start = '2025-01-01';
var end = '2025-05-15';

// Harmonized Sentinel-2 Level 2A collection
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filter(ee.Filter.bounds(aoi))
  .filterDate(start, end);

// Cloud Score+ image collection (from Sentinel-2 Level 1C)
var csPlus = ee.ImageCollection('GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED');

// Set Cloud Score+ QA band and threshold
var QA_BAND = 'cs';
var CLEAR_THRESHOLD = 0.60;

// Build clear-pixel composite
var image = s2
  .linkCollection(csPlus, [QA_BAND])
  .map(function(img) {
    return img.updateMask(img.select(QA_BAND).gte(CLEAR_THRESHOLD));
  });
```
---
### Step 2. Calculate the NDVI

We need to calculate NDVI for all images in the filtered ImageCollection based on our date and AOI.
To do this dynamically, we use a function that calculates NDVI, copies the `system:time_start` property (so we can plot date and time in a chart), and adds the NDVI band to each image in the same collection.

```js
// NDWI using normalizedDifference()
var ndvi = function(image) {
  var calNDVI = image.normalizedDifference(['B8', 'B4'])
                .rename('ndvi')
                .copyProperties(image, ['system:time_start']);
  return image.addBands(calNDVI);
};
```
---

### Step 3. Map the NDVI Function Over the ImageCollection
`map()` runs the function on **every image** in the collection, giving you a new collection with NDVI for each date.
```js
// Apply NDVI function to each image
var ndviCollection = s2.map(addNDVI);
```
---


Sure! Here's **Step 4** for your NDVI analysis:

---

### Step 4. Display the NDVI Time-Series Chart
After creating the NDVI-added ImageCollection, we can visualize how NDVI changes over time by plotting a time-series chart. We use `ui.Chart.image.series()` to plot the average NDVI value over the AOI for each image.

```js
// Display a time-series chart
var chart = ui.Chart.image.series({
  imageCollection: withNdvi.select('NDVI'),
  region: aoi,
  reducer: ee.Reducer.mean(),
  scale: 10
});

// Show the chart in the Console
print(chart);
```
---
#### What it does:
* `withNdvi.select('NDVI')`: selects only the NDVI band from your processed collection.
* `region: aoi`: defines the area over which to calculate average NDVI.
* `reducer: ee.Reducer.mean()`: calculates mean NDVI for each image.
* `scale: 10`: sets the resolution (10 m for Sentinel-2).
---

### Step 5. Customize the NDVI Time-Series Chart Appearance
After creating the chart, you can improve its look using `.setOptions()` from [Google Charts](https://developers.google.com/chart/interactive/docs/gallery/linechart). This lets you add a title, change axis labels, format the time, and style the line/points.

```js
// Customize chart appearance
chart = chart.setOptions({
  title: 'NDVI Time Series',
  lineWidth: 1,
  pointSize: 1,
  interpolateNulls: true,
  vAxis: {title: 'NDVI'},
  hAxis: {
    title: 'Time',
    format: 'yyyy-MMM-dd'
  }
});

// Print the customized chart
print(chart);
```
---
#### What This Does:
* `title`: Adds a title to the chart.
* `lineWidth`: Makes the NDVI trend line thinner.
* `pointSize`: Makes the dots smaller.
* `interpolateNulls`: Connects lines over missing values.
* `vAxis` and `hAxis`: Label axes and format date.

---

####  Chart Customization in GEE
Google Earth Engine allows you to visualize data using different chart types like **scatter plots**, **histograms**, **pie charts** and more using `ui.Chart`.
Below is a sample code to create a **scatter plot** of NDVI vs. Time:

```js
// NDVI Scatter Plot Example
var scatterChart = ui.Chart.image.series({
  imageCollection:  withNdvi.select('NDVI'),
  region: aoi,
  reducer: ee.Reducer.mean(),
  scale: 10
}).setChartType('ScatterChart')  // Convert to scatter plot
  .setOptions({
    title: 'NDVI Scatter Plot',
    hAxis: {title: 'Date', format: 'MMM'},
    vAxis: {title: 'NDVI'},
    pointSize: 1,
    lineWidth: 0,
    colors: ['green'],
    trendlines: {
      0: {
        color: 'purple',
        lineWidth: 2,
        pointSize: 2,
        opacity: 0.2,
        type: 'exponential'
      }
    }
  });

print(scatterChart);
```

**Output:**

<a href="https://code.earthengine.google.com/59a4afa21c0ec593411278e96057edf6?noload=true" target="_blank" style="display: inline-block; padding: 3px 6px; background-color: #0078d4; color: white; text-decoration: none; border-radius: 9px; font-weight: bold;">
  Open in Code Editor 🔗
</a>