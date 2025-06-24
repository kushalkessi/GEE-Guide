
# **Reducers in Google Earth Engine**

In Google Earth Engine, **reducers** are built-in functions that summarize or analyze datasets by performing operations like `sum`, `mean`, `min`, `max`, `standard deviation`, `histogram`, and `linear regression`. They are essential for tasks such as image compositing, time-series analysis, and zonal statistics.

Reducers can be applied using `.reduce()`, `.reduceRegion()`, or `.reduceRegions()` on data types such as **Image**, **ImageCollection**, **FeatureCollection**, or **List**. For example, applying `ee.Reducer.mean()` to an image computes the average pixel value over a specific region. These functions allow for scalable and parallel processing of geospatial data.
## Using Reducers on a List

This section demonstrates how to use reducers on a list of numbers. It helps illustrate how statistical functions like `sum`, `min`, `max`, and `stdDev` can be applied to non-spatial data.

```js
// Create a list of numbers
var myList = ee.List.sequence(0, 20, 3);
print('List:', myList);

// Compute sum
var sum = myList.reduce(ee.Reducer.sum());
print('Total Sum:', sum);

// Compute minimum value
var min = myList.reduce(ee.Reducer.min());
print('Min Value:', min);

// Compute maximum value
var max = myList.reduce(ee.Reducer.max());
print('Max Value:', max);

// Compute both min and max together
var minMax = myList.reduce(ee.Reducer.minMax());
print('Min and Max:', minMax);

// Compute standard deviation
var stdDev = myList.reduce(ee.Reducer.stdDev());
print('Standard Deviation:', stdDev);
```

## Using Reducers on Entire an Image Collection
### Step 1: Load AOI and Image Collection
This example shows how to apply reducers such as `mean()` or `median()` to an entire `ImageCollection`. This is useful for generating composite images that summarize long-term observations over a selected AOI.

```js
// AOI: Define region of interest
var aoi = ee.FeatureCollection("projects/kessikushal/assets/Nepal_Boundary/Kathmandu_Valley");

// Load Sentinel-2 image collection and filter
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi)
  .filterDate('2024-01-01', '2024-12-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .select('B.*');   // Select bands starting with 'B'

print('Number of Images:', s2.size());
```

---
### Step 2: Apply reducer in collection
>  `median()` and `reduce(ee.Reducer.median())` both generate median composite images, but:
> * `.median()` keeps **original band names** (e.g., `B4`, `B3`, ...).
> * `.reduce(ee.Reducer.median())` renames them (e.g., `B4_median`, `B3_median`, ...), which can be helpful for tracking derived bands.

```js
// Reduce entire image collection using median reducer
// Method: 1
var reducedM1 = s2.reduce(ee.Reducer.median());
print('Reduced Collection (Median of Bands):', reducedM1);

// Method: 2 (also using median)
var reducedM2 = s2.reduce(ee.Reducer.median());
print('Reduced Collection (Median of Bands):', reducedM2);
```

---
### Step 3: Use Reducer on a Single Image
You can also calculate `mean()`, `median()`, `max()` values on a single image. This is helpful when working with specific satellite scenes and analyzing pixel-level statistics.

#### How to Select a Single Image:
>1. Load the image collection (don't apply `.median()`).
>2. Print the collection in the Console.
>3. Expand the dropdown under `features`.
>4. Copy the ID of any image.
>5. Use that ID in `ee.Image()` to load it directly.

```js
// Select a specific image by ID
var image = ee.Image('COPERNICUS/S2_HARMONIZED/20250104T050119_20250104T050438_T45RUL')
            .select("B.*");

// RGB visualization parameters
var rgbVis = {min: 0.0, max: 3000, bands: ['B4', 'B3', 'B2']};
Map.addLayer(image, rgbVis, 'Sentinel-2 Image');
```

---
### Step 4: Apply Reducer on Image

This step demonstrates how to calculate summary statistics such as `mean` using `.reduceRegion()` on a single image over a defined AOI.

```js
// Apply reduceRegion on selected image to compute mean values over AOI
var stats = image.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: aoi,
  scale: 10,
  maxPixels: 1e10
});
```

---

### Step 4: Extract Values from the Stats Dictionary
The result of `.reduceRegion()` is a dictionary. You can use `.get()` to extract the mean, median, or other values for individual bands.

```js
// Extract the mean value of whole bands from the stats dictionary using .get() function
print('Average value all B bands:', stats);

// Extract the mean value of band B4 from the stats dictionary using .get() function
print('Average value in B4:', stats.get('B4'));
```

---
#### Note:
You can similarly apply other reducers like `ee.Reducer.median()`, `ee.Reducer.max()`, or compute statistics on custom indices like NDVI, NDBI, etc., by modifying the reducer type and selected bands or expressions.

<a href="https://code.earthengine.google.com/f111d51efa418056c578b9072d2e093b?noload=true" target="_blank" style="display: inline-block; padding: 3px 6px; background-color: #0078d4; color: white; text-decoration: none; border-radius: 9px; font-weight: bold;">
  Open in Code Editor 🔗
</a>