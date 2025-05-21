
import { PantryItem, GroceryItem, Recipe } from '../types';

export const initialPantryItems: PantryItem[] = [
  { id: '1', item: 'Tomatoes' , created_at: new Date() },
  { id: '2', item: 'Milk', created_at: new Date() },
  { id: '3', item: 'Bread' , created_at: new Date() },
  { id: '4', item: 'Eggs' , created_at: new Date() },
  { id: '5', item: 'Cheese', created_at: new Date() },
  { id: '6', item: 'Chicken' , created_at: new Date() },
  { id: '7', item: 'Pasta', created_at: new Date() },
  { id: '8', item: 'Onions' , created_at: new Date() },
];

export const initialGroceryItems: GroceryItem[] = [
  { id: '1', item: 'Rice', is_completed: false, created_at: new Date() },
  { id: '2', item: 'Yogurt', is_completed: false, created_at: new Date() },
  { id: '3', item: 'Butter', is_completed: false, created_at: new Date() },
];

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    youtube_url: "https://www.youtube.com/watch?v=yzJp59jx4UY",
    title: "Crunchy Potato and Cornflake Cutlets",
    time: "Prep Time: 20 minutes, Cook Time: 30 minutes",
    steps: "Boil and mash the potatoes.\n Mix in finely chopped onions, boiled green peas, and corn.\n Add crushed chili peppers and salt to taste.\n Shape the mixture into cutlets.\n Crush the cornflakes and coat the cutlets with them.\n Shallow fry or bake until golden brown and crunchy.",
    ingredients: [
      "Potatoes",
      "Cereals - Cornflakes",
      "Onions",
      "Green Peas",
      "Corn",
      "Crushed Chili Peppers",
      "Salt"
    ],
    nutrition: [
      "Serving: 1 person",
      "Calories: 400kcal",
      "Carbohydrates: 50g",
      "Protein: 10g",
      "Fat: 18g",
      "Sodium: 300mg",
      "Fiber: 7g"
    ],
    fun_fact: "Cornflakes were invented in the late 19th century as a health food.",
    url: "https://chatgpt.com/backend-api/public_content/enc/eyJpZCI6Im1fNjgyYTUxYmRjNWI0ODE5MWE2MmUxYTAwZDZhNmRjNWE6ZmlsZV8wMDAwMDAwMDA4ZTg2MWZkOTRkZjBiZWZmZGQ0YTRmZCIsInRzIjoiNDg1NDQ1IiwicCI6InB5aSIsInNpZyI6ImZkMjM5ZjdkOWU3OTAwMjUwZGRmNjgzOGQyNDhhMTY5OTc2MTY5ZmY2NzA2M2IzOThmMWRiMmMyZGMxNjc1N2MiLCJ2IjoiMCIsImdpem1vX2lkIjpudWxsfQ==", 
    query: "crunchy potato cornflake cutlets"
  },
  {
    id: "2",
    youtube_url: "https://www.youtube.com/watch?v=0MShTeCsuQM",
    title: "Masala Poha with Peanuts and Potato Chips",
    time: "Prep Time: 15 minutes, Cook Time: 25 minutes",
    steps: "1. Rinse the poha and set aside.\n2. Sauté mustard seeds and chopped onions.\n3. Add peanuts and sauté for a minute.\n4. Mix in the poha, crushed potato chips, crushed chili peppers, and salt.\n5. Cook for a few minutes until heated through.",
    ingredients: [
      "Poha",
      "Onions",
      "Mustard Seeds",
      "Peanuts",
      "Potato Chips",
      "Crushed Chili Peppers",
      "Salt"
    ],
    nutrition: [
      "Serving: 1 person",
      "Calories: 250kcal",
      "Carbohydrates: 30g",
      "Protein: 6g",
      "Fat: 12g",
      "Sodium: 150mg",
      "Fiber: 5g"
    ],
    fun_fact: "Poha is a popular breakfast dish in India, made from flattened rice.",
    url: "https://videos.openai.com/vg-assets/assets%2Ftask_01jvjyw4heeqcacn8jkhqer10e%2F1747614360_img_1.webp?st=2025-05-18T22%3A59%3A23Z&se=2025-05-24T23%3A59%3A23Z&sks=b&skt=2025-05-18T22%3A59%3A23Z&ske=2025-05-24T23%3A59%3A23Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=Eg17oVDeS%2FztQuKBpaKl7NM%2FQjYeLNg%2Fp3I%2BH0FeMO8%3D&az=oaivgprodscus",
    query: "with peanuts potato chips"
  },
  {
    id: "3",
    youtube_url: "https://www.youtube.com/watch?v=ZmxQmldGLOw",
    title: "Cornflake Crusted Egg Omelette",
    time: "Prep Time: 10 minutes, Cook Time: 20 minutes",
    steps: "1. Whisk the eggs with chopped onions, bell peppers, crushed chili peppers, and salt.\n2. Crush the cornflakes\n3. Pour egg mixture into a pan. Sprinkle crushed cornflakes and place a cheese slice on top while cooking.\n4. Cook until the omelette is set and the cheese is melted.",
    ingredients: [
      "Eggs",
      "Cereals - Cornflakes",
      "Onions",
      "Bell Peppers",
      "Cheese Slices",
      "Crushed Chili Peppers",
      "Salt"
    ],
    nutrition: [
      "Serving: 1 person",
      "Calories: 300kcal",
      "Carbohydrates: 40g",
      "Protein: 8g",
      "Fat: 10g",
      "Sodium: 200mg",
      "Fiber: 2g"
    ],
    fun_fact: "Conrnflakes were originally created as a health food to promote vegetarianism.",
    url: "https://videos.openai.com/vg-assets/assets%2Ftask_01jvjz4qy3ftdbtvdpy5kj10aq%2F1747614638_img_0.webp?st=2025-05-18T23%3A01%3A04Z&se=2025-05-25T00%3A01%3A04Z&sks=b&skt=2025-05-18T23%3A01%3A04Z&ske=2025-05-25T00%3A01%3A04Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=r4rw%2B7iYwgxrafDZt2WXKDaRBGgHwEwakEkdoJzuT1Y%3D&az=oaivgprodscus",
    query: "cornflake crusted egg omelette"
  }
];

export const sampleIndianRecipes: Recipe[] = [
  {
    "id": "1",
    "youtube_url": "https://www.youtube.com/watch?v=U_I_argpX20",
    "title": "Aloo Palak with Roti",
    "steps": "1. Boil and lightly mash the potatoes.\n2. Sauté onions and chili peppers until golden brown.\n3. Add chopped spinach and tomatoes; cook until softened.\n4. Add the mashed potatoes, salt, and pepper; cook for another 10 minutes.\n5. Serve hot with roti.",
    "time": "Prep Time: 20 minutes, Cook Time: 30 minutes",
    "nutrition": [
      "Serving: 1 person",
      "Calories: 400kcal",
      "Carbohydrates: 50g",
      "Protein: 10g",
      "Fat: 18g",
      "Sodium: 300mg",
      "Fiber: 7g"
    ],
    "ingredients": [
      "Potatoes",
      "Spinach",
      "Onions",
      "Chili Peppers",
      "Tomatoes",
      "Pepper",
      "Roti"
    ],
    fun_fact: "Aloo Palak is a popular North Indian dish made with potatoes and spinach.",
    "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ugycE3NHftBliOHBVZySan0t/user-XReIwrLdITHc5B5okNQNlpjc/img-QkRtiguVt1KuBV7upKqg9Wb2.png?st=2025-05-18T21%3A18%3A14Z&se=2025-05-18T23%3A18%3A14Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-17T22%3A58%3A29Z&ske=2025-05-18T22%3A58%3A29Z&sks=b&skv=2024-08-04&sig=p/58Yw0NzKpNtrJxqJTLRPsQWWJUwFEW%2BoM8XVf21mM%3D",
    "query": "Aloo Palak with Roti"
  },
  {
    "id": "2",
    "youtube_url": "https://www.youtube.com/watch?v=6WIMjb7Dzn4",
    "title": "Okra and Tomato Sabzi",
    "steps": "1. Wash and chop the okra and tomatoes.\n2. Sauté onions and chili peppers until translucent.\n3. Add the chopped okra and tomatoes; cook until the okra is tender and slightly browned.\n4. Season with salt, pepper, and a squeeze of lemon juice.\n5. Serve as a side dish with roti or rice crackers.",
    "time": "Prep Time: 15 minutes, Cook Time: 25 minutes",
    "nutrition": [
      "Serving: 1 person",
      "Calories: 250kcal",
      "Carbohydrates: 30g",
      "Protein: 6g",
      "Fat: 12g",
      "Sodium: 150mg",
      "Fiber: 5g"
    ],
    "ingredients": [
      "Okra",
      "Tomatoes",
      "Onions",
      "Chili Peppers",
      "Lemons",
      "Pepper",
      "Roti",
      "Rice Crackers"
    ],
    fun_fact: "Okra is a rich source of vitamins A and C, and is known for its health benefits.",
    "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ugycE3NHftBliOHBVZySan0t/user-XReIwrLdITHc5B5okNQNlpjc/img-8mexYjIhzliCGTng2wemwQJG.png?st=2025-05-18T21%3A18%3A29Z&se=2025-05-18T23%3A18%3A29Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-18T03%3A49%3A11Z&ske=2025-05-19T03%3A49%3A11Z&sks=b&skv=2024-08-04&sig=kmhU%2BaVW7S0Mp13JURQ3bPefoybbLm6429Elrz4yOXs%3D",
    "query": "Okra Tomato Sabzi"
  },
  {
    "id": "3",
    "youtube_url": "https://www.youtube.com/watch?v=uUSPMriK-UU",
    "title": "Yogurt Rice with Tadka",
    "steps": "1. Cook rice crackers according to package directions.\n2. Whisk yogurt until smooth and add cooked rice.\n3. In a separate pan, heat a teaspoon of oil.\n4. Add yellow mustard seeds and chili peppers; let them splutter.\n5. Pour the tadka over the yogurt rice.\n6. Garnish with chopped onions and serve chilled.",
    "time": "Prep Time: 10 minutes, Cook Time: 20 minutes",
    "nutrition": [
      "Serving: 1 person",
      "Calories: 300kcal",
      "Carbohydrates: 40g",
      "Protein: 8g",
      "Fat: 10g",
      "Sodium: 200mg",
      "Fiber: 2g"
    ],
    "ingredients": [
      "Yogurt",
      "Rice Crackers",
      "Yellow Mustard",
      "Chili Peppers",
      "Onions"
    ],
    fun_fact: "Yogurt rice is a popular South Indian dish, often served as a cooling side.",
    "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ugycE3NHftBliOHBVZySan0t/user-XReIwrLdITHc5B5okNQNlpjc/img-Zq6bqr8b9e8x2o1bVUMDr5P2.png?st=2025-05-18T21%3A18%3A46Z&se=2025-05-18T23%3A18%3A46Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-17T23%3A09%3A55Z&ske=2025-05-18T23%3A09%3A55Z&sks=b&skv=2024-08-04&sig=emXlauGaNe2UpTCNnPd/4N%2B1adL58xvZQejwgisR2ZA%3D",
    "query": "Yogurt Rice with Tadka"
  }
]

export const sampleChineseRecipes: Recipe[] = [
  {
    "id": "1",
    "youtube_url": "https://www.youtube.com/watch?v=0JPMDiI-yvM",
    "title": "Tofu and Bok Choy Stir-Fry with Rice",
    "steps": "1. Press tofu to remove excess water, then cube.\n2. Chop bok choy, spring onions, ginger, and garlic.\n3. Heat soy sauce in a pan.\n4. Add tofu and stir-fry until golden brown.\n5. Add ginger and garlic and stir-fry until fragrant.\n6. Add bok choy and spring onions; stir-fry until tender.\n7. Serve over jasmine rice.",
    "time": "Prep Time: 20 minutes, Cook Time: 30 minutes",
    "nutrition": [
      "Serving: 1 person",
      "Calories: 450kcal",
      "Carbohydrates: 50g",
      "Protein: 20g",
      "Fat: 20g",
      "Sodium: 700mg",
      "Fiber: 5g"
    ],
    "ingredients": [
      "Tofu",
      "Bok Choy",
      "Spring Onions",
      "Soy Sauce",
      "Jasmine Rice",
      "Ginger",
      "Garlic"
    ],
    fun_fact: "Tofu is a great source of protein and is often used in vegetarian dishes.",
    "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ugycE3NHftBliOHBVZySan0t/user-XReIwrLdITHc5B5okNQNlpjc/img-xigDGlHHUhGrHPGBT7wkL5a3.png?st=2025-05-18T21%3A26%3A05Z&se=2025-05-18T23%3A26%3A05Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-18T00%3A44%3A37Z&ske=2025-05-19T00%3A44%3A37Z&sks=b&skv=2024-08-04&sig=0VQVg07ohlu4Bh3I/KIiYJxvuyH2r9/YcUrFpILbITk%3D",
    "query": "Tofu Bok Choy"
  },
  {
    "id": "2",
    "youtube_url": "https://www.youtube.com/watch?v=znp2lcNcyFI",
    "title": "Spicy Chinese Chow Mein",
    "steps": "1. Cook Chow Mein noodles according to package instructions.\n2. Stir-fry onions, chili peppers, and garlic in a pan until fragrant.\n3. Add soy sauce and toss to coat.\n4. Add cooked noodles and stir-fry until heated through.",
    "time": "Prep Time: 15 minutes, Cook Time: 20 minutes",
    "nutrition": [
      "Serving: 1 person",
      "Calories: 500kcal",
      "Carbohydrates: 70g",
      "Protein: 15g",
      "Fat: 15g",
      "Sodium: 900mg",
      "Fiber: 4g"
    ],
    "ingredients": [
      "Chow Mein",
      "Onions",
      "Chili Peppers",
      "Garlic",
      "Soy Sauce"
    ],
    fun_fact: "Chow Mein is a popular Chinese dish made with stir-fried noodles and vegetables.",
    "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ugycE3NHftBliOHBVZySan0t/user-XReIwrLdITHc5B5okNQNlpjc/img-jeENnaM5jpsUWPa0pbpDEYYC.png?st=2025-05-18T21%3A26%3A16Z&se=2025-05-18T23%3A26%3A16Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-18T22%3A26%3A16Z&ske=2025-05-19T22%3A26%3A16Z&sks=b&skv=2024-08-04&sig=2k6Y8dLSw7lpvPZIa4eqapqy6aguL9eaY5okyelLeCs%3D",
    "query": "Spicy Chinese Chow Mein"
  },
  {
    "id": "3",
    "youtube_url": "https://www.youtube.com/watch?v=IHOuMizuz3c",
    "title": "Egg Fried Rice with Spring Onions",
    "steps": "1. Cook jasmine rice and let it cool slightly.\n2. Scramble eggs in a pan and set aside.\n3. Stir-fry spring onions, ginger, and garlic in the same pan.\n4. Add rice and soy sauce; stir-fry until heated through.\n5. Add scrambled eggs and stir-fry until combined.",
    "time": "Prep Time: 15 minutes, Cook Time: 25 minutes",
    "nutrition": [
      "Serving: 1 person",
      "Calories: 400kcal",
      "Carbohydrates: 60g",
      "Protein: 12g",
      "Fat: 12g",
      "Sodium: 600mg",
      "Fiber: 2g"
    ],
    "ingredients": [
      "Jasmine Rice",
      "Eggs",
      "Spring Onions",
      "Soy Sauce",
      "Ginger",
      "Garlic"
    ],
    fun_fact: "Egg fried rice is a popular dish in Chinese cuisine, often served as a side or main dish.",
    "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ugycE3NHftBliOHBVZySan0t/user-XReIwrLdITHc5B5okNQNlpjc/img-LhzTNaBR05UWwBe2T3NcEhkQ.png?st=2025-05-18T21%3A26%3A29Z&se=2025-05-18T23%3A26%3A29Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-18T07%3A49%3A40Z&ske=2025-05-19T07%3A49%3A40Z&sks=b&skv=2024-08-04&sig=seHPnB9ov5mYFIqgmOeQKbnwiTGR/UqL2G43WeQf7wE%3D",
    "query": "Egg Fried Rice with Spring Onions"
  }
]

export const sampleSweetRecipes: Recipe[] = [
        {
          "id": "1",
          "youtube_url": "https://www.youtube.com/watch?v=onG_gjUrALI",
          "title": "Sweet Roti Dessert Wraps with Chocolate Nutella and Almond Cookie Crumble",
          "steps": "Prepare the Roti: If using pre-made Roti, warm it slightly. If making from scratch, use All Purpose Flour, a pinch of salt, and water to create a dough. Roll out into thin circles and cook on a hot griddle until lightly browned.\nChocolate Nutella Spread: Warm the Chocolate Nutella slightly to make it easier to spread.\nAlmond Cookie Crumble: Crush the Almond Cookies into a fine crumble.\nAssemble the Wraps: Spread a generous layer of Chocolate Nutella on each Roti. Sprinkle the Almond Cookie Crumble over the Nutella.\nAdd Yogurt and Maple Syrup: Drizzle a small amount of Yogurt and Maple Syrup over the cookie crumble for extra flavor and moisture.\nWrap and Serve: Fold the Roti in half or roll it up like a burrito. Serve immediately.",
          "time": "Prep Time: 20 mins, Cook Time: 25 mins",
          "nutrition": [
            "Serving: 1 person",
            "Calories: 450kcal",
            "Carbohydrates: 60g",
            "Protein: 10g",
            "Fat: 20g",
            "Sodium: 200mg",
            "Fiber: 5g"
          ],
          ingredients: [],
          fun_fact: "Nutella was invented in the 1940s in Italy and has become a global favorite.",
          "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ugycE3NHftBliOHBVZySan0t/user-XReIwrLdITHc5B5okNQNlpjc/img-BCK7wpxDkOk3WxofIeXfGFaW.png?st=2025-05-19T02%3A21%3A44Z&se=2025-05-19T04%3A21%3A44Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-18T21%3A48%3A58Z&ske=2025-05-19T21%3A48%3A58Z&sks=b&skv=2024-08-04&sig=iLeY3k1/tgk45wwdNpE6R8j7vnr/tpeBbXB8QhX99iw%3D",
          "query": "Chocolate Nutella Almond Cookie"
        },
        {
          "id": "2",
          "youtube_url": "https://www.youtube.com/watch?v=7KOOm9RJZ7U",
          "title": "Sweet Alfredo Pasta Dessert with Crumbled Cookies and Whipped Cream",
          "steps": "Cook the Pasta: Cook Semolina Linguine Pasta according to package directions until al dente. Drain well.\nPrepare the Sweet Alfredo Sauce: In a saucepan, gently heat the Alfredo Pasta Sauce. Stir in a tablespoon of Maple Syrup and a splash of Milk to sweeten it.\nCookie Crumble: Crush the Cookies into a medium-fine crumble.\nWhipping Cream: Whip the Whipping Cream until stiff peaks form. Sweeten with a teaspoon of Maple Syrup.\nAssemble the Dessert: Toss the cooked pasta with the sweet Alfredo sauce. Place in a serving dish.\nGarnish: Top with crumbled Cookies and a generous dollop of sweetened Whipped Cream. Drizzle extra Maple Syrup over the top.\nServe: Serve immediately while the pasta is warm and the Whipped Cream is chilled.",
          "time": "Prep Time: 25 mins, Cook Time: 20 mins",
          "nutrition": [
            "Serving: 1 person",
            "Calories: 600kcal",
            "Carbohydrates: 70g",
            "Protein: 15g",
            "Fat: 30g",
            "Sodium: 400mg",
            "Fiber: 4g"
          ],
          ingredients: [],
          fun_fact: "Alfredo sauce was created in Rome in the early 20th century and is now popular worldwide.",
          "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ugycE3NHftBliOHBVZySan0t/user-XReIwrLdITHc5B5okNQNlpjc/img-yyCJGJ9z07JC0rnw3W8wQoZO.png?st=2025-05-19T02%3A21%3A56Z&se=2025-05-19T04%3A21%3A56Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-18T03%3A25%3A50Z&ske=2025-05-19T03%3A25%3A50Z&sks=b&skv=2024-08-04&sig=z7dD49BwZAk4yNZlvdb6fzPnmK8ewX/aUl1wj8uJlaM%3D",
          "query": "Crumbled Cookies Whipped Cream"
        },
        {
          "id": "3",
          "youtube_url": "https://www.youtube.com/watch?v=YPbqqozAouQ",
          "title": "Jasmine Rice Pudding with Chocolate Nutella Swirl and Rice Cracker Crunch",
          "steps": "Cook the Rice: Cook Jasmine Rice with Milk and a splash of Whipping Cream until the rice is soft and creamy. Add Maple Syrup to sweeten. Stir frequently to prevent sticking.\nChocolate Nutella Swirl: Warm the Chocolate Nutella slightly. Once the rice pudding is cooked, swirl in the Chocolate Nutella to create a marbled effect.\nRice Cracker Crunch: Crush the Rice Crackers into small pieces.\nAssemble the Dessert: Spoon the rice pudding into bowls.\nGarnish: Sprinkle the crushed Rice Crackers over the top for added texture and crunch.\nServe: Serve warm or chilled.",
          "time": "Prep Time: 15 mins, Cook Time: 30 mins",
          "nutrition": [
            "Serving: 1 person",
            "Calories: 550kcal",
            "Carbohydrates: 80g",
            "Protein: 10g",
            "Fat: 20g",
            "Sodium: 300mg",
            "Fiber: 3g"
          ],
          fun_fact: "Rice pudding has been enjoyed for centuries and is a comfort food in many cultures.",
          ingredients: [],
          "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ugycE3NHftBliOHBVZySan0t/user-XReIwrLdITHc5B5okNQNlpjc/img-gF73zdgTiNaXCdqNcivwF7PK.png?st=2025-05-19T02%3A22%3A10Z&se=2025-05-19T04%3A22%3A10Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-19T02%3A19%3A37Z&ske=2025-05-20T02%3A19%3A37Z&sks=b&skv=2024-08-04&sig=%2BLTXuOa/jgMMquOOGRyU32RwZwLPWh86QEJZATVnFz8%3D",
          "query": "Nutella Swirl Rice Cracker"
        }
]