using System.ComponentModel.DataAnnotations;

namespace SergioTenza.Blazor.Wasm.Attributes
{
    public class DateRangeAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object? value, ValidationContext validationContext) =>
            value switch
            {
                null => ValidationResult.Success,
                DateTime date when date.DayOfWeek == DayOfWeek.Saturday => new ValidationResult($"Se deben elegir dias laborales."),
                DateTime date when date.DayOfWeek == DayOfWeek.Sunday => new ValidationResult($"Se deben elegir dias laborales."),
                _ => ValidationResult.Success
            };
    }
}
