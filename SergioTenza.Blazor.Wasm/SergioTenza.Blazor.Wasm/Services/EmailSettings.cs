using System;

namespace SergioTenza.Blazor.Wasm.Services;

public class EmailSettings
{

    public string SmtpServer { get; set; } = string.Empty;
    public int SmtpPort { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string SmtpUsername { get; set; } = string.Empty;
    public string SmtpPassword { get; set; } = string.Empty;
    public string ToEmail { get; set; } = string.Empty;
    public string ToName { get; set; } = string.Empty;
    public bool EnableSsl { get; set; }

}
