using Core.Extensions;
using Infra.DataAccess;
using Infra.DataAccess.Seed;
using Infra.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

/*********************************************************/
/* Add services to the container *************************/
/*********************************************************/

// Setup Application Services
builder.Services.AddCoreServices(builder.Configuration);
builder.Services.AddInfraServices(builder.Configuration);

// Setup CORS Services
builder.Services.AddCors();
// Setup Controller Services
builder.Services.AddControllers();
// Setup Response Caching
builder.Services.AddResponseCaching();

// Setup OpenAPI/Swagger Services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*********************************************************/
/* Configure Application *********************************/
/*********************************************************/

var app = builder.Build();

// Enable OpenAPI/Swagger Documentation
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable HTTPS Redirection
app.UseHttpsRedirection();

// Configure CORS
app.UseCors(policy => policy
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
);

// Configure Exception Handler
app.UseExceptionHandler("/api/errors");

app.MapControllers();

// Configure Response Caching
app.UseResponseCaching();

/*********************************************************/
/* Migrate Database **************************************/
/*********************************************************/

{
    // Get access to service provider
    using var scope = app.Services.CreateScope();
    var services = scope.ServiceProvider;

    try
    {
        // Get access to DBContext (DataContext) service
        var dataContext = services.GetRequiredService<DataContext>();

        // Automatically run pending database migrations
        // dotnet ef database update
        await dataContext.Database.MigrateAsync();

        // Seed database
        var seed = new Seed(dataContext);
        await seed.PopulateDatabase();
    }
    catch (Exception ex)
    {
        // Get access to Logger service
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occured during migration");
    }
}

/*********************************************************/
/* Run Application ***************************************/
/*********************************************************/

app.Run();