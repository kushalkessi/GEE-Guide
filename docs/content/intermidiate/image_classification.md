# Image Classification in Google Earth Engine
In Google Earth Engine (GEE) image classification is the process of assigning each pixel in satellite imagery to a specific land cover class such as water, forest or urban area. This technique helps in interpreting satellite data for real-world applications like land use mapping, change detection, and environmental monitoring. Classification methods in GEE are mainly divided into `Unsupervised` and `Supervised` approaches.<br>
In **unsupervised classification**, the algorithm automatically groups pixels based on spectral similarity without needing labeled training data. <br> 
**Supervised classification** requires the user to provide training data—points labeled with known land cover types—which the algorithm uses to learn and classify the rest of the image.<br>
GEE supports powerful machine learning classifiers through the `ee.Classifier()` function, including **CART** (Classification and Regression Tree) using `ee.Classifier.smileCart()`, **Random Forest** using `ee.Classifier.smileRandomForest()` which builds an ensemble of decision trees, and **SVM** (Support Vector Machine) using `ee.Classifier.libsvm()` for finding the optimal boundaries between classes. These classifiers can be trained with `trainClassifier()` and applied with `classify()` functions. The effectiveness of the classification is often assessed using a confusion matrix `confusionMatrix()`.



---
**Output:**

<a href="https://code.earthengine.google.com/59a4afa21c0ec593411278e96057edf6?noload=true" target="_blank" style="display: inline-block; padding: 3px 6px; background-color: #0078d4; color: white; text-decoration: none; border-radius: 9px; font-weight: bold;">
  Open in Code Editor 🔗
</a>