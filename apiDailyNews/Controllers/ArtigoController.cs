using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ArtigoController : ControllerBase
{
    private readonly DataContext context;

    public ArtigoController(DataContext Context)
    {
        context = Context;
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] Artigo model)
    {
        try
        {
            context.Artigo.Add(model);
            await context.SaveChangesAsync();
            return Ok("Artigo salvo com sucesso");
        }
        catch
        {
            return BadRequest("Falha ao inserir o artigo");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Artigo>>> Get()
    {
        try
        {
            return Ok(await context.Artigo.ToListAsync());
        }
        catch
        {
            return BadRequest("Erro ao obter os artigos");
        }
    }

     [HttpPut("{id}")]
    public async Task<ActionResult> Put([FromRoute] int id, [FromBody] Artigo model)
    {
        if (id != model.Id)
            return BadRequest();

        try
        {
            if (await context.Artigo.AnyAsync(p => p.Id == id) == false)
                return NotFound();

            context.Artigo.Update(model);
            await context.SaveChangesAsync();
            return Ok("Artigo alterado com sucesso");
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
            Artigo model = await context.Artigo.FindAsync(id);

            if (model == null)
                return NotFound();

            context.Artigo.Remove(model);
            await context.SaveChangesAsync();
            return Ok("Tipo de curso removido com sucesso");
        }
        catch
        {
            return BadRequest("Falha ao remover o tipo de curso");
        }
    }
}