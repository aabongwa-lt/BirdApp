using Bird.Server.Data;
using Bird.Server.Repositories;
using Bird.Server.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Bird.Server.Controller;

[ApiController]
[Route("api/[controller]")]
public  class BirdController(AppDbContext db): ControllerBase
{
    private readonly IBirdInterface _birdInterface = new BirdRepository(db);
    [HttpPost]
    public async Task<ActionResult<BirdDto>> CreateBird([FromBody] BirdDto entity) =>
        await _birdInterface.CreateBirdAsync(entity);

    [HttpGet]
    public async Task<List<Domain.Bird>> GetAllBirds() => await _birdInterface.GetAllBirds();
}

public record BirdDto {
    public string Name { get; init; }
    public string Description { get; init; }}