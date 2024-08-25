using System.ComponentModel.DataAnnotations;

namespace SergioTenza.Blazor.Wasm.Attributes
{
    public class DateRangeAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is DateTime dateTime)
            {
                return dateTime.DayOfWeek switch 
                { 
                    DayOfWeek.Saturday => new ValidationResult($"Se deben elegir dias laborales."),
                    DayOfWeek.Sunday => new ValidationResult($"Se deben elegir dias laborales."),
                    _ => ValidationResult.Success
                };                
            }
            return new ValidationResult("No se ha elegido una fecha.");
        }
    }
}
