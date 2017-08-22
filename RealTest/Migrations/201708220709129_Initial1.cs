namespace RealTest.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial1 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.GSModels", newName: "Movies");
            AlterColumn("dbo.Movies", "Review", c => c.String(maxLength: 5));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Movies", "Review", c => c.String());
            RenameTable(name: "dbo.Movies", newName: "GSModels");
        }
    }
}
