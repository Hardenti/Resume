using System;

namespace Chapter5SwitchActivity
{
    class Program
    {
        static void Main()
        {
            Console.WriteLine("Chapter 5 Activity: Simplifying if Statements with switch");
            Console.WriteLine("========================================================");
            Console.WriteLine();

            // Part 6: Rewrite the if statement as a switch.
            Console.WriteLine("Part 6: Convert the menu example to a switch");
            int choice = 2;

            switch (choice)
            {
                case 1:
                    Console.WriteLine("You selected Add.");
                    break;

                case 2:
                    Console.WriteLine("You selected Edit.");
                    break;

                case 3:
                    Console.WriteLine("You selected Delete.");
                    break;

                default:
                    Console.WriteLine("Invalid choice.");
                    break;
            }

            Console.WriteLine();

            // Part 8: Practice problem using a switch statement.
            Console.WriteLine("Part 8: Rating practice problem");
            Console.Write("Enter a rating from 1 through 5: ");
            string? input = Console.ReadLine();

            if (int.TryParse(input, out int rating))
            {
                switch (rating)
                {
                    case 1:
                        Console.WriteLine("1 = Very Bad");
                        break;

                    case 2:
                        Console.WriteLine("2 = Bad");
                        break;

                    case 3:
                        Console.WriteLine("3 = Okay");
                        break;

                    case 4:
                        Console.WriteLine("4 = Good");
                        break;

                    case 5:
                        Console.WriteLine("5 = Excellent");
                        break;

                    default:
                        Console.WriteLine("Invalid rating.");
                        break;
                }
            }
            else
            {
                Console.WriteLine("Invalid rating.");
            }

            Console.WriteLine();

            // Part 7: Multiple values can share a case.
            Console.WriteLine("Part 7: Multiple values can share one case");
            int day = 6;

            switch (day)
            {
                case 6:
                case 7:
                    Console.WriteLine("Weekend");
                    break;

                default:
                    Console.WriteLine("Weekday");
                    break;
            }

            Console.WriteLine();

            // Part 9: Challenge example.
            Console.WriteLine("Part 9: Challenge - rewrite the menu using switch");
            int menuChoice = 3;

            switch (menuChoice)
            {
                case 1:
                    Console.WriteLine("Add item");
                    break;

                case 2:
                    Console.WriteLine("Remove item");
                    break;

                case 3:
                    Console.WriteLine("View items");
                    break;

                case 4:
                    Console.WriteLine("Exit");
                    break;

                default:
                    Console.WriteLine("Invalid choice");
                    break;
            }

            Console.WriteLine();
            Console.WriteLine("The big idea:");
            Console.WriteLine("Specific values should use switch.");
            Console.WriteLine("Questions and ranges should use if.");
            Console.WriteLine();
            Console.WriteLine("Example:");
            Console.WriteLine("if (score >= 70) is a good if statement.");
            Console.WriteLine("switch (choice) is useful for specific menu choices.");

            // Extra example matching the customer type lesson.
            Console.WriteLine();
            Console.WriteLine("Customer type example");
            string customerType = "R";

            switch (customerType)
            {
                case "R":
                    Console.WriteLine("Regular customer");
                    break;

                case "C":
                    Console.WriteLine("Commercial customer");
                    break;

                case "G":
                    Console.WriteLine("Government customer");
                    break;

                default:
                    Console.WriteLine("Unknown customer type");
                    break;
            }
        }
    }
}
