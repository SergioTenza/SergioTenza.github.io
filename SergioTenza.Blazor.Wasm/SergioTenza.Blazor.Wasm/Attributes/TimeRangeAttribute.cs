﻿using System.ComponentModel.DataAnnotations;

namespace SergioTenza.Blazor.Wasm.Attributes
{
    public class TimeRangeAttribute : ValidationAttribute
    {
        private readonly TimeSpan _minTime;
        private readonly TimeSpan _maxTime;

        public TimeRangeAttribute(string minTime, string maxTime)
        {
            _minTime = TimeSpan.Parse(minTime);
            _maxTime = TimeSpan.Parse(maxTime);
        }

        protected override ValidationResult IsValid(object? value, ValidationContext validationContext) =>
            value switch
            {
                null => ValidationResult.Success,
                DateTime dateTime when dateTime.TimeOfDay < _minTime || dateTime.TimeOfDay > _maxTime => new ValidationResult($"La hora debe estar entre {_minTime} y {_maxTime}."),
                _ => ValidationResult.Success
            };          
    }
}
