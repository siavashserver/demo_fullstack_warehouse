using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infra.Migrations
{
    public partial class InitialEntityIndexing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Orders_CustomerId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_LineItems_ProductId",
                table: "LineItems");

            migrationBuilder.CreateIndex(
                name: "IX_Products_Name",
                table: "Products",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerId_Date",
                table: "Orders",
                columns: new[] { "CustomerId", "Date" });

            migrationBuilder.CreateIndex(
                name: "IX_LineItems_ProductId_Date",
                table: "LineItems",
                columns: new[] { "ProductId", "Date" });

            migrationBuilder.CreateIndex(
                name: "IX_Customers_Name",
                table: "Customers",
                column: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Products_Name",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Orders_CustomerId_Date",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_LineItems_ProductId_Date",
                table: "LineItems");

            migrationBuilder.DropIndex(
                name: "IX_Customers_Name",
                table: "Customers");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerId",
                table: "Orders",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_LineItems_ProductId",
                table: "LineItems",
                column: "ProductId");
        }
    }
}
