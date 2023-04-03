using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class GerenciadorSenhasController : ControllerBase
{
    private readonly DataContext context;

    public GerenciadorSenhasController(DataContext Context)
    {
        context = Context;
    }
}