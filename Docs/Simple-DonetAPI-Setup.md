# .NET Web API Setup Template

Use this template whenever you need to scaffold a new .NET Web API project with SQL database integration.

---

## Prerequisites
- **.NET 10 SDK** installed ([download here](https://dotnet.microsoft.com/download))
- **SQL Server** (Express, Developer, or LocalDB)
- A code editor (Visual Studio, VS Code, or Rider)

---

## Step 1: Create the Project

```bash
dotnet new webapi -n [YourProjectName]
cd [YourProjectName]
```

This creates a basic Web API template with default controllers and structure.

---

## Step 2: Add Entity Framework Core

Add the necessary NuGet packages:

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
```

---

## Step 3: Create Your Data Model(s)

Create a new folder called `Models` and add your entity files (e.g., `Product.cs`):

```csharp
namespace [YourProjectName].Models
{
    public class [EntityName]
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        // Add your properties here
    }
}
```

---

## Step 4: Create the DbContext

Create a `Data` folder and add `ApplicationDbContext.cs`:

```csharp
using Microsoft.EntityFrameworkCore;
using [YourProjectName].Models;

namespace [YourProjectName].Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Add your DbSets here
        public DbSet<[EntityName]> [EntityNames] { get; set; }
    }
}
```

---

## Step 5: Configure the Database Connection

Edit `appsettings.json` and add your connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=[YourDatabaseName];Trusted_Connection=true;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

> **Note:** Adjust the connection string based on your SQL Server setup:
> - **LocalDB**: `Server=(localdb)\\mssqllocaldb;Database=...;Trusted_Connection=true;`
> - **SQL Server Express**: `Server=.\\SQLEXPRESS;Database=...;Trusted_Connection=true;`
> - **Full SQL Server**: `Server=YOUR_SERVER;Database=...;User Id=sa;Password=YOUR_PASSWORD;`

---

## Step 6: Register DbContext in Dependency Injection

Edit `Program.cs` and add this code **before** `var app = builder.Build();`:

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

---

## Step 7: Create and Apply Migrations

Generate the initial migration:

```bash
dotnet ef migrations add InitialCreate
```

Apply the migration to create the database:

```bash
dotnet ef database update
```

---

## Step 8: Generate a Controller (Optional - Auto-scaffolding)

If you want Entity Framework to auto-generate a controller with CRUD operations:

```bash
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet aspnet-codegenerator controller -name [EntityName]sController -async -api -m [EntityName] -dc ApplicationDbContext -outDir Controllers
```

Or manually create a controller in the `Controllers` folder:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using [YourProjectName].Data;
using [YourProjectName].Models;

namespace [YourProjectName].Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class [EntityName]sController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public [EntityName]sController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<[EntityName]>>> Get[EntityName]s()
        {
            return await _context.[EntityNames].ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<[EntityName]>> Get[EntityName](int id)
        {
            var entity = await _context.[EntityNames].FindAsync(id);
            if (entity == null) return NotFound();
            return entity;
        }

        [HttpPost]
        public async Task<ActionResult<[EntityName]>> Create[EntityName]([EntityName] entity)
        {
            _context.[EntityNames].Add(entity);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get[EntityName]), new { id = entity.Id }, entity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update[EntityName](int id, [EntityName] entity)
        {
            if (id != entity.Id) return BadRequest();
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete[EntityName](int id)
        {
            var entity = await _context.[EntityNames].FindAsync(id);
            if (entity == null) return NotFound();
            _context.[EntityNames].Remove(entity);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
```

---

## Step 9: Run Your Application

```bash
dotnet run
```

Your API will be available at `https://localhost:7xxx` (or `http://localhost:5xxx`)

---

## Project Structure

```
[YourProjectName]/
├── Controllers/
│   ├── [EntityName]sController.cs
│   └── (other controllers)
├── Data/
│   └── ApplicationDbContext.cs
├── Models/
│   ├── [EntityName].cs
│   └── (other models)
├── Migrations/
│   └── (auto-generated files)
├── Properties/
├── appsettings.json
├── Program.cs
└── [YourProjectName].csproj
```

---

## Testing Your API

Once running, visit:
- **Swagger UI**: `https://localhost:7xxx/swagger/ui`
- **Get All**: `GET /api/[entitynames]`
- **Get by ID**: `GET /api/[entitynames]/1`
- **Create**: `POST /api/[entitynames]` with JSON body
- **Update**: `PUT /api/[entitynames]/1` with JSON body
- **Delete**: `DELETE /api/[entitynames]/1`

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Connection string fails | Verify SQL Server is running; check `appsettings.json` connection string |
| Migration fails | Delete `Migrations` folder and run `dotnet ef migrations add InitialCreate` again |
| Port conflicts | Change port in `Properties/launchSettings.json` |
| DbContext not found | Verify the namespace in `Program.cs` matches your project structure |
| SQL Server not found | Use `Server=.` for LocalDB or `Server=.\\SQLEXPRESS` for Express Edition |

---

## Additional Commands Reference

```bash
# View current migrations
dotnet ef migrations list

# Remove last migration (if not applied to DB)
dotnet ef migrations remove

# Drop database
dotnet ef database drop

# Recreate database from scratch
dotnet ef database drop --force
dotnet ef database update

# Scaffold from existing database
dotnet ef dbcontext scaffold "connection-string" Microsoft.EntityFrameworkCore.SqlServer -o Models
```

---

## Quick Checklist

- [ ] .NET 10 SDK installed
- [ ] Project created with `dotnet new webapi`
- [ ] EF Core NuGet packages added
- [ ] Models created in `Models/` folder
- [ ] `ApplicationDbContext` created in `Data/` folder
- [ ] Connection string configured in `appsettings.json`
- [ ] DbContext registered in `Program.cs`
- [ ] Initial migration created
- [ ] Database updated
- [ ] Controller(s) created
- [ ] Application runs successfully

---

**Last Updated**: .NET 10
**Template Version**: 1.0