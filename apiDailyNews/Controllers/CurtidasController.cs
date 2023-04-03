using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class CurtidasController : ControllerBase
{
    private readonly DataContext context;

    public CurtidasController(DataContext Context)
    {
        context = Context;
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] Curtidas model)
    {
        try
        {
            context.Curtidas.Add(model);
            await context.SaveChangesAsync();
            return Ok("Curtidas salvo com sucesso");
        }
        catch
        {
            return BadRequest("Falha ao inserir o Curtidas");
        }
    }

}