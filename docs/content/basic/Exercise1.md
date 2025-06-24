# <u>**Exercise 1**</u>

### **Add Landsat Image Collection**
Landsat is a long-running Earth observation program that provides moderate-resolution satellite imagery (30 m) for monitoring land use, vegetation, and environmental changes since 1972.
**[Landsat Data Catalog](https://developers.google.com/earth-engine/datasets/catalog/landsat)**

### Landsat Missions, Launch Dates & Earth Engine Collections

| Landsat Mission | Launch Year  | Earth Engine Collection ID |
| --------------- | -------------| ---------------------------|
| Landsat 1       | 1972         | `LANDSAT/LT04/C02/T1_L2`   |
| Landsat 2       | 1975         | `LANDSAT/LM02/C02/T1`      |
| Landsat 3       | 1978         | `LANDSAT/LM03/C02/T1`      |
| Landsat 4       | 1982         | `LANDSAT/LT04/C02/T1_L2`   |
| Landsat 5       | 1984         | `LANDSAT/LT05/C01/T1_SR`   |
| Landsat 7       | 1999         | `LANDSAT/LE07/C02/T1_L2`   |
| Landsat 8       | 2013         | `LANDSAT/LC08/C02/T1_L2`   |
| Landsat 9       | 2021         | `LANDSAT/LC09/C02/T1_L2`   |

### **Goal:**
Load Landsat imagery for Nepal (Jan–Feb 2025), apply filters, create composites, and display them — just like Sentinel-2.

---
### **Key Differences from Sentinel-2:**
| Property         | Sentinel-2                    | Landsat 8/9                                          |
| ---------------- | ----------------------------- | ---------------------------------------------------- |
| Dataset          | `COPERNICUS/S2_SR_HARMONIZED` | `LANDSAT/LC08/C02/T1_L2` or `LANDSAT/LC09/C02/T1_L2` |
| Bands (True RGB) | `B4`, `B3`, `B2`              | `SR_B4` (Red), `SR_B3` (Green), `SR_B2` (Blue)       |
| Resolution       | 10 m                          | 30 m                                                 |

### **Output (Description):**

> A true color (RGB) Landsat 8 median and mosaic composite image over Nepal from January–February 2025, with less than 10% cloud cover, clipped to the shapefile boundary, and shown at 30-meter resolution.

---

### **Code Hints for Landsat Image Processing in GEE**
| **Concept**                | **Code / Hint**                                              |
| -------------------------- | ------------------------------------------------------------ |
| Import shapefile           | `ee.FeatureCollection("users/your_username/aoi")` |
| Load Landsat collection    | `'LANDSAT/LC08/C02/T1_L2'` or `'LANDSAT/LC09/C02/T1_L2'`     |
| Filter date                | `.filterDate('2025-01-01', '2025-02-28')`                    |
| Filter by location         | `.filterBounds(aoi)`                                       |
| Filter by cloud cover      | `.filter(ee.Filter.lt('CLOUD_COVER', 10))`                   |
| Count images (client-side) | `.size().evaluate(function(count) { print(count); })`        |
| Select bands (true color)  | `image.select(['SR_B4', 'SR_B3', 'SR_B2'])`                  |
| Create median composite    | `.median()`                                                  |
| Clip to shapefile          | `.clip(aoi)`                                               |
| Visualize on map           | `Map.addLayer(image, visParams, 'Label')`                    |
| Center map view            | `Map.centerObject(nepal, zoomLevel)`                         |
---