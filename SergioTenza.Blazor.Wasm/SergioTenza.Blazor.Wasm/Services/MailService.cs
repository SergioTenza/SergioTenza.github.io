using System;
using MailKit.Net.Smtp;
using MimeKit;

namespace SergioTenza.Blazor.Wasm.Services;

public class MailService
{
    private readonly EmailSettings _emailSettings;

    public MailService(EmailSettings emailSettings)
    {
        _emailSettings = emailSettings;
    }

    public (bool success,string message) SendMailNotification(string sender, string message, string name, string position)
    {
        try
        {
            var messageMime = new MimeMessage();
            messageMime.From.Add(new MailboxAddress(name, sender));
            messageMime.To.Add(new MailboxAddress(_emailSettings.ToName, _emailSettings.ToEmail));
            messageMime.Subject = $"{_emailSettings.Subject}  from {name} - {position}";

            messageMime.Body = new TextPart("plain")
            {
                Text = message
            };

            using (var client = new SmtpClient())
            {
                client.Connect(_emailSettings.SmtpServer, _emailSettings.SmtpPort, _emailSettings.EnableSsl);

                client.Authenticate(_emailSettings.SmtpUsername,_emailSettings.SmtpPassword);

                client.Send(messageMime);
                client.Disconnect(true);
                return (true,sender);
            }

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);  
            return (false,ex.Message);
        }
    }
}