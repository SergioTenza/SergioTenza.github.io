using home.sergeix.source.SergioTenza_github_io.SergioTenza_Blazor_Wasm.SergioTenza_Blazor_Wasm.Components;
using Microsoft.FluentUI.AspNetCore.Components;
using SergioTenza.Blazor.Wasm.Components;
using SergioTenza.Blazor.Wasm.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddFluentUIComponents();
builder.Services.AddSingleton(builder.Configuration.GetSection("EmailSettings").Get<EmailSettings>() ?? new EmailSettings());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>().AddInteractiveServerRenderMode();

app.Run();