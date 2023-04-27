using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ComentariosController : ControllerBase
{
    private readonly DataContext context;

    public ComentariosController(DataContext Context)
    {
        context = Context;
    }
    [HttpPost]
    public async Task<ActionResult> Post([FromBody] Comentarios model)
    {
        try
        {

            if(model == null)
                return BadRequest();

            model.Data = DateTime.Now;

            context.Comentarios.Add(model);
            await context.SaveChangesAsync();
            return Ok("Comentários cadastrado com sucesso");
        }
        catch
        {
            return BadRequest("Falha ao cadastrar o Comentário");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Comentarios>>> Get()
    {
        try
        {
            return Ok(await context.Comentarios.ToListAsync());
        }
        catch
        {
            return BadRequest("Erro ao consultar os Comentários");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Comentarios>>> Get([FromRoute] int? id)
    {
        try
        {
            return Ok(await context.Comentarios.Include(p=> p.Artigo).Where(p=> p.ArtigoID == id).ToListAsync());
        }
       catch(Exception ex)
        {
            return BadRequest("Erro ao consultar os comentarios "+ ex.Message);
        }
    }

     [HttpPut("{id}")]
    public async Task<ActionResult> Put([FromRoute] int id, [FromBody] Comentarios model)
    {
        if (id != model.Id)
            return BadRequest();

        try
        {
            if (await context.Comentarios.AnyAsync(p => p.Id == id) == false)
                return NotFound();

            context.Comentarios.Update(model);
            await context.SaveChangesAsync();
            return Ok("Comentário alterado com sucesso");
        }
        catch
        {
            return BadRequest("Falha ao alterar o comentário");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete([FromRoute] int id)
    {
        try
        {
            Comentarios? model = await context.Comentarios.FindAsync(id);

            if (model == null)
                return NotFound();

            context.Comentarios.Remove(model);
            await context.SaveChangesAsync();
            return Ok("Comentário excluído com sucesso");
        }
        catch
        {
            return BadRequest("Falha ao excluir o comentário");
        }
    }
}