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
            if (model == null)
                return BadRequest();

            model.DataCadastro = DateTime.Now;

            context.Artigo.Add(model);
            await context.SaveChangesAsync();
            return Ok("Artigo cadastrado com sucesso");
        }
        catch(Exception ex)
        {
            return BadRequest("Falha ao cadastrar o artigo " + ex.Message);
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Artigo>>> Get()
    {
        try
        {
            return Ok(await context.Artigo.Include(p=> p.Usuario).ToListAsync());
        }
       catch(Exception ex)
        {
            return BadRequest("Erro ao consultar os artigos "+ ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Artigo>>> Get([FromRoute] int? id)
    {
        try
        {
            return Ok(await context.Artigo.Include(p=> p.Usuario).Where(p=> p.Id == id).ToListAsync());
        }
       catch(Exception ex)
        {
            return BadRequest("Erro ao consultar os artigos "+ ex.Message);
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


            if (model.publicado == true)
                model.DataPublicacao = DateTime.Now;

            model.DataUltimaAlteracao = DateTime.Now;

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
            Artigo? model = await context.Artigo.FindAsync(id);

            if (model == null)
                return NotFound();

            context.Artigo.Remove(model);
            await context.SaveChangesAsync();
            return Ok("Artigo excluído com sucesso");
        }
        catch
        {
            return BadRequest("Falha ao excluir o artigo");
        }
    }
}