using System;
using FluentEmail.Core;

namespace SergioTenza.Blazor.Wasm.Services;

public class MailService
{
    public async Task<bool> SendMailNotification(string sender, string message,string name,string position)
    {

        var email = await Email
            .From(sender)
            .To("info@tnzservicios.es", "contact info")
            .Subject($"Web contact form {name}: {position}")
            .Body(message)
            .SendAsync();
        return email.Successful;

    }
}
