using Bird.Server.Controller;

namespace Bird.Server.Repositories.Interfaces;

public interface IBirdInterface
{
    Task<BirdDto> CreateBirdAsync(BirdDto birdDto);
    Task<List<Domain.Bird>> GetAllBirds();
    Task<Domain.Bird> GetBirdById(int id);
}