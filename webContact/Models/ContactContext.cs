using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace webContact.Models
{
    public class ContactContext : DbContext
    {
        public ContactContext()
            : base()
        {
            Database.SetInitializer<ContactContext>(new ContactContextInitializer());
        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }

    public class ContactContextInitializer : DropCreateDatabaseIfModelChanges<ContactContext>
    {
        protected override void Seed(ContactContext context)
        {
            var list = new List<Contact>
            {
                new Contact { FirstName = "Jose", LastName = "da Silva", Email = "jose@teste.com.br", Phone = "99999999", Address = "Rua Teste 123, Centro, São Paulo, SP" },
                new Contact { FirstName = "Maria", LastName = "das Dores", Email = "maria@teste.com.br", Phone = "99999999", Address = "Rua Teste 123, Centro, São Paulo, SP" }
            };

            list.ForEach(m =>
            {
                context.Contacts.Add(m);
            });

            context.SaveChanges();
            base.Seed(context);
        }
    }
}