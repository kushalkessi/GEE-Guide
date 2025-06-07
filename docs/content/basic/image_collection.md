## ImageCollection
In Google Earth Engine, an **ImageCollection** is a set of satellite images or raster datasets grouped together based on certain criteria such as sensor type, date range, or spatial coverage. It is used to work with large stacks of imagery. Each image in the collection has its own metadata (like date, cloud cover, etc.) and bands (like Red, Green,, Blue, NIR). You can filter ImageCollections by date, region or metadata, and apply functions like median, mean or cloud masking over time. ImageCollections are fundamental for time-series analysis, change detection, land cover classification, and environmental monitoring tasks.
The `ee.ImageCollection()` syntax is used to load a ImageCollection.

---

### **Sentinel-2 Image Collection**

Here’s a step-by-step breakdown of your Sentinel-2 RGB visualization code in Google Earth Engine (GEE) for **e-learning**, including **basic content, syntax explanation**, and the corresponding **code blocks**. This is perfect for a tutorial or class module.

---

### Step 1: Define Area of Interest (AOI) - Nepal
In GEE, an **AOI** helps filter satellite data only for the region you're interested in—in this case, **Nepal** from the GAUL dataset.
```js
// Load Area of Interest (Nepal from GAUL)
var gaul = ee.FeatureCollection('FAO/GAUL/2015/level0')
              .filter(ee.Filter.eq('ADM0_NAME', 'Nepal'));

var nepal = gaul.geometry();  // Extract geometry of Nepal
```

---

### Step 2: Load Sentinel-2 Image Collection
Load the entire Sentinel-2 surface reflectance (SR) dataset before applying any filters.
```js
// Load Sentinel-2 Surface Reflectance Image Collection
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED');
```

---

### Step 3: Filter the Image Collection by Date

Now filter the previously loaded collection by **date range** (e.g., May 2025).
```js
// Define the date range
var startDate = '2025-01-01';
var endDate = '2025-01-30';

// Apply date filter
s2 = s2.filterDate(startDate, endDate);
```

---

### Step 4: Filter by Location (Spatial Filter)
This step limits the image collection to only the area that intersects Nepal.
* `.filterBounds(geometry)` keeps only images overlapping the AOI.
```js
// Filter by Nepal boundary
s2 = s2.filterBounds(nepal);
```

---

### Step 5: Filter by Cloud Percentage
To ensure clearer images, only images with **less than 10% cloud cover** are selected.
* `.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))` keeps only less cloudy images.
```js
// Cloud cover less than 10%
s2 = s2.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)); 
```

---

### Step 6: Visualization Parameters (RGB Image)
We visualize the images using RGB bands—**B4 (Red), B3 (Green), B2 (Blue)**—with proper scaling.
* Bands `['B4', 'B3', 'B2']` simulate natural color.
* `min` and `max` control brightness and contrast.
```js
// Visualization parameters
var visParams = {
  bands: ['B4', 'B3', 'B2'],  // RGB bands
  min: 0,
  max: 3000
};
```

---

### Step 7: Center the Map and Display Image
This part displays the **Sentinel 2 image** to the map, centered over Nepal.
```js
// Center map and add image layer
Map.centerObject(nepal, 7);
Map.addLayer(s2, visParams, 'Sentinel-2 RGB');
```

---

**Output:**
A True color (RGB) Sentinel-2 image over Nepal with less than 10% cloud cover from Jaunary 2025.

---
<a href="https://code.earthengine.google.com/29ba331d59732bced67eeb09bf09d198?noload=true" target="_blank" style="display: inline-block; padding: 3px 6px; background-color: #0078d4; color: white; text-decoration: none; border-radius: 9px; font-weight: bold;">
  Open in Code Editor 🔗
</a>