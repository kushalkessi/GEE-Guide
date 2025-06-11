<div style="float:left; padding:0px; margin-right:10px; margin-top:0px"><img src= "../../images/earth-engine-logo.png" title="earth-engine-logo" width="40px" /></div>

# Google Earth Engine Basic 

## Basic Javascript Programming
This script introduces the basic Javascript syntax **Variables (Number/String), List, Dictionary, Function**which covers the programming concepts you need to learn when using Earth Engine. 

#### **Keyboard Shortcuts**
* `Ctrl + Enter`: Runs the script
* `Ctrl + /`: Comments or uncomments selected lines
* `Ctrl + s`: Save the current script
* `Ctrl + space`: Suggest functions, variables, and object methods while typing

#### 1. **Print Statement**

```js
print('Welcome to GEE Course');
```

This prints a message to the **Console tab** in the Earth Engine Code Editor.

**Output:**
```txt
Welcome to GEE Course
```

**`Use Case:`**
Useful for checking output values such as pixel values, variable contents or debugging your script while processing satellite data.

---

#### 2. **Comments**
Anything written after `//` is ignored by the computer. It's for **your understanding** or reminders.
```js
// This is a comment!
```

---

#### 3. **Variable**
A container that holds a value which can be changed or used later in the program.
**`Use Case:`**
Variables store values like image collections, geographic coordinates or parameters used in Earth Engine scripts.

#### a. **String Variable**
A sequence of characters or text, enclosed in quotes.
```js
var country = 'Nepal';
print(country);
```

* `"Nepal"` is a **string** (text).
* `country` stores this text.

**Output:**
```txt
Nepal
```

---

#### b. **Number Variable**
A numerical value that can be an integer or decimal
```js
var elevation = 8848.86;
print(elevation);
```

* `elevation` stores the **height of Mount Everest**.

**Output:**
```txt
8848.86
```

---

#### 4. **List (Array)**
An ordered collection of multiple values stored in one variable, accessible by position (index starts at 0).
```js
var fruits = ['Apple', 'Banana', 'Mango', 'Orange'];
print(fruits);
print(fruits[2]);
```

* `fruits[2]` gets the **third fruit** (count starts at 0).

**Output:**
```txt
['Apple', 'Banana', 'Mango', 'Orange']
Mango
```
**`Use Case:`**
Lists are used to store multiple values such as bands of satellite images, coordinates of points, or dates for time series analysis. For example, you can keep a list of image IDs to process them one by one or manage multiple threshold values for classification.

---

#### 8. **Dictionary (Object)**
A collection of key-value pairs where each key is unique and maps to a value. Like a mini database record.
```js
var mountainInfo = {
    'name': 'Mount Everest',
    'location': 'Nepal',
    'height': 8848.46
};
print(mountainInfo);
print(mountainInfo.height);

```

* Access `.height` to get: `8848.46`

**Output:**
```txt
Object (3 properties)
8848.46
```
**`Use Case:`**
Dictionaries organize related data like image metadata, analysis parameters, and feature properties. They simplify managing export settings (e.g., file name, scale) and help map classification codes to labels for easier interpretation. Dictionaries make your code cleaner and more flexible.

---

#### 9. **Function**
A reusable block of code designed to perform a task. It can take inputs (parameters) and return outputs.
```js
function introduce(name) {
  var sentence  =  'My name is ' + name;
  return sentence;
}
print(introduce('Roman'));
print(introduce('Hari'));
```

* `introduce('Roman')` returns `My name is Roman`

**Output:**
```txt
My name is Roman
My name is Hari
```
**`Use Case:`**
Functions help automate repetitive tasks like calculating indices (e.g., NDVI), applying filters, or formatting data. They make your code cleaner and easier to manage by avoiding repetition.

---
<a href="https://code.earthengine.google.com/5166c6689099cc389be0f08153c36771?noload=true" target="_blank" style="display: inline-block; padding: 3px 6px; background-color: #0078d4; color: white; text-decoration: none; border-radius: 9px; font-weight: bold;">
  Open in Code Editor 🔗
</a>

