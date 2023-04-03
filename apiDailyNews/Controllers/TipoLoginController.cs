using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class TipoLoginController : ControllerBase
{
    private readonly DataContext context;

    public TipoLoginController(DataContext Context)
    {
        context = Context;
    }
}