using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class UsuarioController : ControllerBase
{
    private readonly DataContext context;

    public UsuarioController(DataContext Context)
    {
        context = Context;
    }
    [HttpPost]
    public async Task<ActionResult> Post([FromBody] Usuario model)
    {
        try
        {
            context.Usuario.Add(model);
            await context.SaveChangesAsync();
            return Ok("Usuário salvo com sucesso");
        }
        catch
        {
            return BadRequest("Falha ao inserir o Usuário");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Usuario>>> Get()
    {
        try
        {
            return Ok(await context.Usuario.ToListAsync());
        }
        catch
        {
            return BadRequest("Erro ao obter os Usuários");
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Put([FromRoute] int id, [FromBody] Usuario model)
    {
        if (id != model.Id)
            return BadRequest();

        try
        {
            if (await context.Usuario.AnyAsync(p => p.Id == id) == false)
                return NotFound();

            context.Usuario.Update(model);
            await context.SaveChangesAsync();
            return Ok("Usuário alterado com sucesso");
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete([FromRoute] int id)
    {
        try
        {
            Usuario model = await context.Usuario.FindAsync(id);

            if (model == null)
                return NotFound();

            context.Usuario.Remove(model);
            await context.SaveChangesAsync();
            return Ok("Usuário removido com sucesso");
        }
        catch
        {
            return BadRequest("Falha ao remover o Usuário");
        }
    }
}