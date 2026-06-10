using Bird.Server.Controller;
using Bird.Server.Data;
using Bird.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Bird.Server.Repositories;

public class BirdRepository : IBirdInterface
{
    
    private readonly AppDbContext _db;
    
    public BirdRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<BirdDto> CreateBirdAsync(BirdDto entity)
    {
        var bird = new Domain.Bird
        {
            Name = entity.Name,
            Description = entity.Description,
        };
        
        _db.Birds.Add(bird);
        await _db.SaveChangesAsync();
        return entity;
    }

    public async Task<List<Domain.Bird>> GetAllBirds() => 
        await _db.Birds.ToListAsync();

    public Task<Domain.Bird> GetBirdById(int id)
    {
        throw new NotImplementedException();
    }
}