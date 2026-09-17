namespace Assignemet_1_Tiyana_harden;

// This program manages a simple personal expense tracker.
// The user can add expenses, view the list, and see the total amount spent.
public class Expense
{
    public string Description { get; set; }
    public string Category { get; set; }
    public decimal Amount { get; set; }

    // The Expense class stores details for a single expense item.
    public Expense(string description, string category, decimal amount)
    {
        Description = description;
        Category = category;
        Amount = amount;
    }

    // Returns a formatted string describing the expense.
    public string GetFormattedDescription()
    {
        return $"{Description} ({Category}): ${Amount:F2}";
    }
}

public class Program
{
    private static readonly List<Expense> expenses = new();

    public static void Main()
    {
        DisplayWelcomeMessage();

        while (true)
        {
            DisplayMenu();
            Console.Write("Choose an option: ");
            string? choice = Console.ReadLine();

            switch (choice)
            {
                case "1":
                    AddExpense();
                    break;
                case "2":
                    ViewExpenses();
                    break;
                case "3":
                    ViewTotalExpenses();
                    break;
                case "4":
                    Console.WriteLine("Thank you for using the Personal Expense Tracker.");
                    return;
                default:
                    Console.WriteLine("Invalid option. Please choose 1, 2, 3, or 4.");
                    break;
            }
        }
    }

    // Displays the main title for the application.
    private static void DisplayWelcomeMessage()
    {
        Console.WriteLine("Personal Expense Tracker");
        Console.WriteLine();
    }

    // Displays the main menu options for the user.
    private static void DisplayMenu()
    {
        Console.WriteLine("1 - Add Expense");
        Console.WriteLine("2 - View Expenses");
        Console.WriteLine("3 - View Total Expenses");
        Console.WriteLine("4 - Exit");
        Console.WriteLine();
    }

    // Adds a new Expense object to the collection after validating input.
    private static void AddExpense()
    {
        Console.Write("Enter description: ");
        string? description = Console.ReadLine();

        while (string.IsNullOrWhiteSpace(description))
        {
            Console.WriteLine("Description cannot be empty.");
            Console.Write("Enter description: ");
            description = Console.ReadLine();
        }

        Console.Write("Enter category: ");
        string? category = Console.ReadLine();

        while (string.IsNullOrWhiteSpace(category))
        {
            Console.WriteLine("Category cannot be empty.");
            Console.Write("Enter category: ");
            category = Console.ReadLine();
        }

        decimal amount;
        bool validAmount = false;

        while (!validAmount)
        {
            Console.Write("Enter amount: ");
            string? amountInput = Console.ReadLine();

            if (decimal.TryParse(amountInput, out amount) && amount > 0)
            {
                validAmount = true;
                Expense expense = new(description.Trim(), category.Trim(), amount);
                expenses.Add(expense);
                Console.WriteLine($"Expense added: {expense.GetFormattedDescription()}");
                Console.WriteLine();
                return;
            }

            Console.WriteLine("Invalid amount. Please enter a valid number greater than 0.");
        }
    }

    // Displays all expenses currently stored in the list.
    private static void ViewExpenses()
    {
        Console.WriteLine();

        if (expenses.Count == 0)
        {
            Console.WriteLine("No expenses recorded yet.");
            Console.WriteLine();
            return;
        }

        Console.WriteLine("Expenses:");
        foreach (Expense expense in expenses)
        {
            Console.WriteLine(expense.GetFormattedDescription());
        }

        Console.WriteLine();
    }

    // Calculates and displays the total of all recorded expenses.
    private static void ViewTotalExpenses()
    {
        decimal total = expenses.Sum(expense => expense.Amount);
        Console.WriteLine($"Total Expenses: ${total:F2}");
        Console.WriteLine();
    }
}

