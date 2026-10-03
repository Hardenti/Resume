# Reflection

1. What is the difference between a variable and a constant?
   A variable can change while the program is running, but a constant stays the same. In my program, labor rate and tax rate are constants because those values should not change.

2. Why was decimal used for money values?
   I used decimal because it is more accurate for currency calculations than float or double. It avoids small rounding errors that can happen with floating-point data types.

3. What is the purpose of an enum?
   An enum groups related named options into one type. I used the ProjectType enum to safely represent Small, Medium, and Large project choices.

4. Give an example of a nullable value in your program.
   The discount percentage is nullable. If the user presses Enter, the value is null and no discount is applied.

5. What is the difference between implicit and explicit casting?
   Implicit casting happens automatically when conversion is safe. Explicit casting is when I manually convert a value, like casting the result of Math.Ceiling to an int for estimated days.

6. Describe one place where you used the Math class.
   I used Math.Round to round the final total to two decimal places and Math.Ceiling to estimate whole work days based on labor hours.

7. Why is variable scope important?
   Variable scope controls where a variable can be used. Good scope keeps code easier to read, prevents accidental changes, and helps avoid naming conflicts.
