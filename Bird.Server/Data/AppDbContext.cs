using Microsoft.EntityFrameworkCore;
using Bird.Server.Domain;
namespace Bird.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}
    
    public DbSet<Domain.Bird> Birds { get; init; }
}