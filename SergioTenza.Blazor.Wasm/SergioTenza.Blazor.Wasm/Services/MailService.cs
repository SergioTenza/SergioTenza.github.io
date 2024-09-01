using System;
using MailKit.Net.Smtp;
using MimeKit;

namespace SergioTenza.Blazor.Wasm.Services;

public class MailService
{
    public async Task<bool> SendMailNotification(string sender, string message, string name, string position)
    {
        var messageMime = new MimeMessage();
        messageMime.From.Add(new MailboxAddress(name, sender));
        messageMime.To.Add(new MailboxAddress("TNZ Servicios Informaticos", "info@tnzservicios.es"));
        messageMime.Subject = $"Web contact from {name} - {position}";

        messageMime.Body = new TextPart("plain")
        {
            Text = message
        };

        using (var client = new SmtpClient())
        {
            client.Connect("smtp.ionos.es", 465, true);

            client.Authenticate("info@tnzservicios.es", "password");

            client.Send(messageMime);
            client.Disconnect(true);
            return false;

        }
    }
