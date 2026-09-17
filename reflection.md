# Reflection

1. What is the difference between a class and an object?
   A class is a blueprint that defines the structure and behavior of a type. An object is an instance of that class created in memory with actual values.

2. What is instantiation?
   Instantiation is the process of creating an object from a class using the `new` keyword and a constructor.

3. Which properties and methods did your Expense class contain?
   The `Expense` class contained the properties `Description`, `Category`, and `Amount`. It also contained the method `GetFormattedDescription()`, which returned a string in the format `Description (Category): $Amount`.

4. Describe one syntax error you encountered.
   One syntax error I encountered was forgetting to close a brace or using the wrong type in a method call, which caused the compiler to report a syntax error until the code was corrected.

5. Describe one runtime error or bug you encountered.
   One bug I encountered was accepting invalid numeric input, such as a word like `abc`, which caused the program to either fail or loop incorrectly until I added validation with `decimal.TryParse()`.

6. How did testing help you find problems in your code?
   Testing helped by showing exactly where the program did not behave as expected. It allowed me to confirm that invalid input was handled correctly and that the total amount updated correctly after adding expenses.
