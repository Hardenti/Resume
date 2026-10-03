namespace Assignemet_1_Tiyana_harden;

// Program purpose:
// Create a freelance project estimate based on labor, materials, project type,
// optional discount, and tax.

public enum ProjectType
{
    Small,
    Medium,
    Large
}

public static class Program
{
    private const decimal LABOR_RATE = 75.00m;
    private const decimal TAX_RATE = 0.07m;

    public static void Main()
    {
        Console.WriteLine("---------------------------------");
        Console.WriteLine("Freelance Project Estimator");
        Console.WriteLine("---------------------------------");

        // Gather required user input.
        string clientName = ReadRequiredText("Client Name: ");
        decimal laborHours = ReadDecimal("Labor Hours: ", allowZero: false);
        decimal materialCost = ReadDecimal("Material Cost: ", allowZero: true);
        ProjectType projectType = ReadProjectType("Project Type (Small, Medium, Large): ");
        decimal? discountPercent = ReadNullableDecimal("Do you have a discount percentage? (Press Enter if none): ");

        // Calculate estimate amounts.
        decimal laborCost = laborHours * LABOR_RATE;
        decimal multiplier = GetComplexityMultiplier(projectType);
        decimal baseSubtotal = (laborCost + materialCost) * multiplier;

        // Apply optional discount before tax.
        decimal appliedDiscountPercent = discountPercent ?? 0m;
        decimal discountAmount = baseSubtotal * (appliedDiscountPercent / 100m);
        decimal subtotal = baseSubtotal - discountAmount;

        decimal tax = subtotal * TAX_RATE;
        decimal totalCost = subtotal + tax;

        decimal roundedTotal = Math.Round(totalCost, 2, MidpointRounding.AwayFromZero);
        int estimatedDays = (int)Math.Ceiling(laborHours / 8m);
        int projectNumber = new Random().Next(1000, 10000);

        // Display formatted estimate report.
        Console.WriteLine();
        Console.WriteLine("---------------------------------");
        Console.WriteLine("PROJECT ESTIMATE");
        Console.WriteLine("---------------------------------");
        Console.WriteLine($"Project Number: {projectNumber}");
        Console.WriteLine($"Client: {clientName}");
        Console.WriteLine($"Project Type: {projectType}");
        Console.WriteLine();
        Console.WriteLine($"Labor Cost:      {laborCost,10:C2}");
        Console.WriteLine($"Material Cost:   {materialCost,10:C2}");

        if (discountPercent.HasValue)
        {
            Console.WriteLine($"Discount ({discountPercent.Value}%): {-discountAmount,10:C2}");
        }
        else
        {
            Console.WriteLine("Discount:       No discount applied");
        }

        Console.WriteLine($"Subtotal:        {subtotal,10:C2}");
        Console.WriteLine($"Tax:             {tax,10:C2}");
        Console.WriteLine();
        Console.WriteLine($"TOTAL:           {roundedTotal,10:C2}");
        Console.WriteLine();
        Console.WriteLine($"Estimated Days:  {estimatedDays}");
        Console.WriteLine("---------------------------------");
    }

    private static string ReadRequiredText(string prompt)
    {
        while (true)
        {
            Console.Write(prompt);
            string? value = Console.ReadLine();

            if (!string.IsNullOrWhiteSpace(value))
            {
                return value.Trim();
            }

            Console.WriteLine("Value cannot be blank.");
        }
    }

    private static decimal ReadDecimal(string prompt, bool allowZero)
    {
        while (true)
        {
            Console.Write(prompt);
            string? input = Console.ReadLine();

            if (decimal.TryParse(input, out decimal result))
            {
                if (result > 0 || (allowZero && result == 0))
                {
                    return result;
                }
            }

            Console.WriteLine(allowZero
                ? "Enter a valid number that is zero or greater."
                : "Enter a valid number greater than zero.");
        }
    }

    private static decimal? ReadNullableDecimal(string prompt)
    {
        while (true)
        {
            Console.Write(prompt);
            string? input = Console.ReadLine();

            if (string.IsNullOrWhiteSpace(input))
            {
                return null;
            }

            if (decimal.TryParse(input, out decimal discount) && discount >= 0m && discount <= 100m)
            {
                return discount;
            }

            Console.WriteLine("Enter a valid discount between 0 and 100, or press Enter for none.");
        }
    }

    private static ProjectType ReadProjectType(string prompt)
    {
        while (true)
        {
            Console.Write(prompt);
            string? input = Console.ReadLine();

            if (Enum.TryParse(input, true, out ProjectType type))
            {
                return type;
            }

            Console.WriteLine("Invalid project type. Enter Small, Medium, or Large.");
        }
    }

    private static decimal GetComplexityMultiplier(ProjectType projectType)
    {
        return projectType switch
        {
            ProjectType.Small => 1.0m,
            ProjectType.Medium => 1.15m,
            ProjectType.Large => 1.30m,
            _ => 1.0m
        };
    }
}

