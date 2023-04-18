using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class TipoLoginController : ControllerBase
{
    private readonly DataContext context;

    public TipoLoginController(DataContext Context)
    {
        context = Context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TipoLogin>>> Get()
    {
        try
        {
            return Ok(await context.TipoLogin.ToListAsync());
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}