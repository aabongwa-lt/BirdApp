using Bird.Server.Controller;
using Bird.Server.Data;
using Bird.Server.Repositories;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Bird.Server.Tests;

public class BirdRepositoryTest
{
    
    private readonly AppDbContext _db;
    private BirdRepository _repo;
    
    private AppDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
        return new AppDbContext(options);
    }

    public BirdRepositoryTest()
    {
        _db = GetInMemoryDbContext();
        _repo = new BirdRepository(_db);
    }
    
    [Fact]
    public async Task CreateBirdAsync_ShouldAddBirdToDatabase()
    {
        // Arrange
        var birdDto = new BirdDto { Name = "Eagle", Description = "Large bird" };

        // Act
        var result = await _repo.CreateBirdAsync(birdDto);

        // Assert
        Assert.Equal("Eagle", result.Name);
    }
    
    [Fact]
    public async Task GetAllBirdsAsync_ShouldReturnAllBirds()
    {
        // Arrange
        await _repo.CreateBirdAsync(new BirdDto { Name = "Eagle", Description = "Large bird" });
        await _repo.CreateBirdAsync(new  BirdDto { Name = "Hawk", Description = "Small Fast Bird" });

        // Act
        var result = await _repo.GetAllBirds();

        // Assert
        Assert.Equal(2, result.Count);
    }

    [Fact]
    public void ShouldPass()
    {
        Assert.True(true);
    }
}