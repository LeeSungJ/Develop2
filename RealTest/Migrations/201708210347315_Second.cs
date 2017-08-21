namespace RealTest.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Second : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Movies", newName: "GSModels");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.GSModels", newName: "Movies");
        }
    }
}
