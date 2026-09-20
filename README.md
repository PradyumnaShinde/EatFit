# EatFit
Nutrition Tracker
# EatFit – Smart Nutrition Planner

> **Combating Hidden Malnutrition through Intelligent Diet Tracking**

EatFit is a personalized nutrition planner designed to help people maintain a balanced diet using the food they actually eat. Instead of focusing only on calories, it tracks important nutrients and provides practical suggestions based on the user's food availability, preferences, and eating habits.

## Problem

Many people eat enough food but still suffer from **hidden malnutrition** due to an imbalance of essential nutrients.

This is especially common among:

* College students living in hostels
* Working professionals with busy lifestyles
* People who regularly depend on mess, canteen, or processed food

Existing solutions often require detailed calorie/food tracking, frequent manual input, or do not adapt well to local and readily available foods.

## Our Solution

EatFit makes nutrition tracking **simple, practical, and personalized**.

Users can:

* Add their personal dietary preferences and restrictions
* Upload their mess/canteen menu
* Log meals using familiar quantities such as **rotis, bowls, and spoons**
* Track nutrients such as carbohydrates, proteins, fats, vitamins, minerals, and fibre
* Receive suggestions when certain nutrients are lacking
* Modify their meals when plans change, such as skipping a meal

The system dynamically recalculates the user's nutritional requirements based on these changes.

## Key Features

### Personalized Nutrition Tracking

Tracks the user's daily nutritional intake based on their meals and personal profile.

### Menu-Based Planning

Users can upload their regular mess, canteen, or meal menu for more relevant recommendations.

### Quick Upload

The planned system can identify food items from uploaded menu or food images.

### Quick Suggest

Users can select a food category or upload a food image to receive suitable food suggestions and nutritional information.

### Real-Time Nutrient Tracking

The system continuously updates the user's remaining nutritional requirements.

### Dynamic Diet Planning

If a user skips a meal or changes their diet, the application can adjust the remaining meals accordingly.

### Practical Measurements

Instead of requiring exact weights, EatFit supports everyday measurements such as:

* Rotis
* Bowls
* Spoons
* Custom serving sizes

### User Customization

Recommendations can consider:

* Age
* Gender
* Location
* Physical activity
* Occupation
* Food preferences
* Allergies
* Eating habits

## How It Works

```text
User Profile
     ↓
Food Preferences + Menu
     ↓
Meal Logging
     ↓
Nutritional Calculation
     ↓
Identify Nutrient Gaps
     ↓
Personalized Suggestions
     ↓
Updated Daily Diet
```

## Technology Stack

| Component           | Technology                                            |
| ------------------- | ----------------------------------------------------- |
| Frontend            | Flutter                                               |
| Backend             | Node.js                                               |
| Database            | PostgreSQL                                            |
| Nutrition Data      | USDA FoodData Central, Indian Food Composition Tables |
| Image Recognition   | TensorFlow, PyTorch, Google Vision AI                 |
| OCR / NLP           | Tesseract OCR, spaCy                                  |
| ML / Recommendation | Scikit-learn, TensorFlow                              |
| Authentication      | Firebase Authentication / Auth0                       |
| Cloud               | AWS / Firebase                                        |

## Current Status

The current project is a **prototype website** demonstrating the core concept and user experience.

The larger vision includes:

* AI-powered food recognition
* Menu OCR
* Large-scale nutrition database
* User authentication and storage
* Intelligent recommendation engine
* Real-time personalized nutrition planning

## Future Scope

EatFit can eventually be expanded into:

* College hostel and institutional mess systems
* Campus-wide nutrition monitoring
* Multiple cuisines and regional food databases
* Wearable and fitness-device integration
* Large-scale cloud-based nutrition management
* AI-driven automated recommendations

## Important Note

EatFit is intended as a nutrition-awareness and planning tool and is **not a medical-grade diet solution**.

## Project

**Project:** EatFit – Smart Nutrition Planner

