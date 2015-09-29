using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace webContact.Models
{
    public class ContatoContext : DbContext
    {
        public ContatoContext()
            : base()
        {
            Database.SetInitializer<ContatoContext>(new ContatoContextInitializer());
        }

        public DbSet<Contato> Contatos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }

    public class ContatoContextInitializer : DropCreateDatabaseIfModelChanges<ContatoContext>
    {
        protected override void Seed(ContatoContext context)
        {
            var list = new List<Contato>
            {
                new Contato { Nome = "Jose", SobreNome = "da Silva", Email = "jose@teste.com.br", Telefone = "99999999", Endereco = "Rua Teste 123, Centro, São Paulo, SP" },
                new Contato { Nome = "Maria", SobreNome = "das Dores", Email = "maria@teste.com.br", Telefone = "99999999", Endereco = "Rua Teste 123, Centro, São Paulo, SP" }
            };

            list.ForEach(m =>
            {
                context.Contatos.Add(m);
            });

            context.SaveChanges();
            base.Seed(context);
        }
    }
}