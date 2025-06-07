## Earth Engine Objects
**Server-side** refers to operations and data storage that occur on Google's cloud infrastructure. All major data processing tasks—such as filtering `ImageCollections`, applying reducers, or performing mathematical operations—are executed on the server using Earth Engine objects like `ee.Image`, `ee.Number`, and `ee.Geometry`. This setup is optimized for handling large-scale remote sensing data and computations.

The **Client-side** operates within the user’s local environment, typically the browser. It is used for tasks like displaying results, creating user interfaces and managing logic flow using standard JavaScript types such as `String`, `Number`, and `Array`. Since these two environments operate differently, you cannot directly combine their objects. 

## Mixing Server and Client 🚫
You cannot directly combine server-side and client-side variables.
Always convert appropriately before using them together.

To combine them, you convert client-side values to server-side using `ee.Number()`, `ee.String()`, etc., and server-side results to client-side (for small data only) using `.getInfo()` or `.evaluate()`.


Here’s a properly structured explanation and code examples for **Server-side vs Client-side** in Earth Engine, following your format:

---

### 1. **Server-side Object**

```js
// For Number
var elevation = ee.Number(8848.86); 
print(elevation);
//For String
var place = ee.String("Kathmandu"); 
print(place);
```

This defines a **server-side** number and string object using Earth Engine’s `ee.Number` and `ee.String` respectively. All operations on it happen in the cloud, not in your browser.

**Output:**

```output
8848.86
Kathmandu
```

**`Use Case:`**
Used when performing calculations on Earth Engine servers, especially for working with big datasets like `ImageCollection`, `ee.Image`, `ee.Geometry`.

---

### 2. **Client-side Variable**

```js
// JavaScript number variable
var height = 8848.86;      
print(height);
// JavaScript string variable
var location = ("Kathmandu"); 
print(location);
```

This is a **client-side** variable that exists only in your browser and uses native JavaScript.

**Output:**

```output
8848.86
Kathmandu
```

**`Use Case:`**
Used for simple tasks like setting labels, creating UI text, or basic control logic in your script.

---

### 3. **Convert Client-side to Server-side**

```js
// Convert to Server-side Object
var eeNumber = ee.Number(height);
print(eeNumber);
var eeString = ee.String(location);
print(eeString);
```

You can convert a **client-side** number and string to a **server-side** number and string using `ee.Number()` and `ee.String()` respectively.

**Output:**

```output
8848.86
Kathmandu
```

**`Use Case:`**
When you want to pass a locally defined value (like threshold) into Earth Engine functions for image analysis.

---

### 4. **Convert Server-side to Client-side**

```js
// Convert to client-side using .evaluate()
elevation.evaluate(function(val) {
  print('Elevation (client-side):', val);
});

place.evaluate(function(val) {
  print('Place (client-side):', val);
});
```

This converts a **server-side** object to a **client-side** value using `.getInfo()`.

**Output:**

```output
Elevation (client-side): 8848.86
Place (client-side): Kathmandu
```

**`Use Case:`**
Used when you need a server-side result (like statistics or metadata) inside JavaScript functions or UI logic. Use with caution, only for small data.

---

### 5. **Dates**

```js
// Create a date object directly
var date = ee.Date('2015-12-31');
print('Date (String):', date);

// Initialize an ee.Date object.
var eeNow = ee.Date(Date.now());
print('Now:', eeNow);

// Create date from YMD
var dateFromYMD = ee.Date.fromYMD(2017, 1, 13);
print('Date from YMD:', dateFromYMD);

// Advance date by 1 year
var futureDate = date.advance(1, 'year');
print('Future Date (+1 year):', futureDate);
```

This shows how to create and manipulate **server-side date objects** in Earth Engine.

**Output:**

```output
Date (String): 2015-12-31T00:00:00
Date from YMD: 2017-01-13T00:00:00
Future Date (+1 year): 2016-12-31T00:00:00
```

**`Use Case:`**
Used to filter satellite images by date, calculate time differences between events or create time-series analysis in Earth Engine.

---

### 6. **Lists**

```js
// Make a sequence the hard way.
var eeList = ee.List([1, 2, 3, 4, 5]);
// Make a sequence the easy way!
// Create a sequence list from 1 to 20 with a step of 4
var sequence = ee.List.sequence(1, 20, 4);
print('Sequence List (gap of 4):', sequence);
```

This creates a **server-side list** of numbers spaced by a defined step.

**Output:**

```output
[1, 5, 9, 13, 17]
```

---
**`Use Case:`**
Used for iterating over values (e.g., months, years, thresholds) in Earth Engine functions like mapping or generating charts or time-series composites.

---

### 7. **Dictionaries**

```js
// Make a sequence the hard way.
var eeList = ee.List([1, 2, 3, 4, 5]);
// Make a sequence the easy way!
// Create a sequence list from 1 to 20 with a step of 4
var sequence = ee.List.sequence(1, 20, 4);
print('Sequence List (gap of 4):', sequence);
```

This creates a **server-side list** of numbers spaced by a defined step.

**Output:**

```output
[1, 5, 9, 13, 17]
```

---
**`Use Case:`**
Used for iterating over values (e.g., months, years, thresholds) in Earth Engine functions like mapping or generating charts or time-series composites.

---
<a href="https://code.earthengine.google.com/c7664c9c5f33d525c877a8faf9fe0bc0?noload=true" target="_blank" style="display: inline-block; padding: 3px 6px; background-color: #0078d4; color: white; text-decoration: none; border-radius: 9px; font-weight: bold;">
  Open in Code Editor 🔗
</a>