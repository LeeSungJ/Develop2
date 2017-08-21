namespace RealTest.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Three : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.GSModels", "Review", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.GSModels", "Review");
        }
    }
}
