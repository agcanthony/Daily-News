using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class GerenciadorSenhasController : ControllerBase
{
    private readonly DataContext context;

    public GerenciadorSenhasController(DataContext Context)
    {
        context = Context;
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] GerenciadorSenhas model)
    {
        try
        {
            context.GerenciadorSenhas.Add(model);
            await context.SaveChangesAsync();
            return Ok();
        }
        catch
        {
            return BadRequest("Falha ao cadastrar");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GerenciadorSenhas>>> Get()
    {
        try
        {
            return Ok(await context.GerenciadorSenhas.ToListAsync());
        }
        catch
        {
            return BadRequest("Erro ao consultar");
        }
    }
}