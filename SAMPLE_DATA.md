# Sample Review Templates

Copy these into your `review_templates` table to get started quickly.

## Gym Reviews

### Mood 5 (😍)
```
Amazing gym! The equipment is top-notch, staff is incredibly helpful, and the atmosphere is motivating. Best decision I made for my fitness journey!
```

```
Outstanding facility! Clean, modern equipment and the trainers are phenomenal. This gym has transformed my health and fitness. Highly recommend!
```

### Mood 4 (🙂)
```
Great gym with quality equipment. Staff is friendly and helpful. Good variety of machines and weights. Happy with my membership!
```

```
Solid gym with everything you need. Good atmosphere and well-maintained equipment. Worth the money!
```

### Mood 3 (😐)
```
Decent gym. Has most equipment you'd need. Gets the job done.
```

### Mood 2 (😕)
```
The gym is okay but could use some improvements. Equipment could be better maintained.
```

### Mood 1 (😡)
```
Gym needs improvement. Would appreciate better equipment maintenance and cleaner facilities.
```

---

## Restaurant Reviews

### Mood 5 (😍)
```
Absolutely incredible! The food was delicious, service impeccable, and ambiance perfect. Best dining experience in town! Will definitely return!
```

```
Outstanding restaurant! Every dish was amazing, staff was attentive, and the atmosphere was wonderful. Highly recommend to everyone!
```

### Mood 4 (🙂)
```
Great restaurant with delicious food and friendly service. Really enjoyed our meal and the atmosphere. Would recommend!
```

```
Very good food and service! Menu has great variety and everything we tried was tasty. Will come back!
```

### Mood 3 (😐)
```
Food was decent. Service was okay. It's a reasonable option for dining.
```

### Mood 2 (😕)
```
The restaurant was okay but food took a while. Service could be improved.
```

### Mood 1 (😡)
```
Not satisfied with the experience. Service and food quality need improvement.
```

---

## Salon/Spa Reviews

### Mood 5 (😍)
```
Absolutely amazing experience! The stylist was professional, talented, and really listened to what I wanted. Left feeling fantastic!
```

```
Best salon ever! Incredible service, relaxing atmosphere, and stunning results. My hair looks perfect! Highly recommend!
```

### Mood 4 (🙂)
```
Great salon with skilled stylists. Very pleased with my haircut and the service. Will definitely come back!
```

### Mood 3 (😐)
```
Decent salon. Got a basic cut that was acceptable.
```

### Mood 2 (😕)
```
Salon was okay but not quite what I expected. Could improve on listening to customer preferences.
```

### Mood 1 (😡)
```
Not happy with the service. Results didn't meet expectations and communication could be better.
```

---

## Cafe Reviews

### Mood 5 (😍)
```
Perfect cafe! Amazing coffee, delicious pastries, and wonderful ambiance. The baristas are skilled and friendly. My favorite spot!
```

```
Love this place! Best coffee in town, cozy atmosphere, and great wifi. Perfect for work or relaxation. Highly recommend!
```

### Mood 4 (🙂)
```
Great cafe with good coffee and nice atmosphere. Friendly staff and tasty snacks. Good place to hang out!
```

### Mood 3 (😐)
```
Okay cafe. Coffee is decent and it's a reasonable place to sit.
```

### Mood 2 (😕)
```
Coffee was mediocre and service was slow. Could be better.
```

### Mood 1 (😡)
```
Disappointing experience. Coffee quality and service need improvement.
```

---

## Clothing Store Reviews

### Mood 5 (😍)
```
Love this store! Amazing selection, great quality, and fantastic staff who helped me find exactly what I needed. Best shopping experience!
```

### Mood 4 (🙂)
```
Great clothing store with good variety and quality. Staff was helpful and prices are reasonable. Happy with my purchase!
```

### Mood 3 (😐)
```
Decent store with okay selection. Found what I needed.
```

### Mood 2 (😕)
```
Limited selection and prices are a bit high. Could improve inventory.
```

### Mood 1 (😡)
```
Not satisfied with the selection or service. Needs better variety and customer attention.
```

---

## Hardware Store Reviews

### Mood 5 (😍)
```
Excellent hardware store! Staff is knowledgeable, great inventory, and always find what I need. Best in the area!
```

### Mood 4 (🙂)
```
Very good hardware store with helpful staff. Good selection of tools and supplies. Reliable place to shop!
```

### Mood 3 (😐)
```
Okay hardware store. Has basic supplies and tools.
```

### Mood 2 (😕)
```
Limited stock on some items. Staff could be more knowledgeable.
```

### Mood 1 (😡)
```
Poor selection and unhelpful staff. Needs significant improvement.
```

---

## How to Add These to Your Database

1. Open Backend (click the button in the chat)
2. Go to "Tables" → `review_templates`
3. For each review, click "Insert Row" and add:
   - **niche**: gym / restaurant / salon / cafe / clothing / hardware
   - **mood_level**: 1 to 5
   - **review_text**: Copy from above

💡 **Pro Tip**: Add all 5 mood levels for each niche you use. The system picks randomly when multiple templates exist.