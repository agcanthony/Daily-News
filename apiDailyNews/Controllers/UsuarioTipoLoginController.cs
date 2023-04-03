using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class UsuarioTipoLoginController : ControllerBase
{
    private readonly DataContext context;

    public UsuarioTipoLoginController(DataContext Context)
    {
        context = Context;
    }

    
}