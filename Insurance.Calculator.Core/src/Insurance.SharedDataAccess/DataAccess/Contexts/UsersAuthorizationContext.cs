using System;
using System.Collections.Generic;
using Insurance.SharedDataAccess.Entities.UsersAuthorizationEntities;
using Microsoft.EntityFrameworkCore;

namespace Insurance.SharedDataAccess.DataAccess.Contexts;

public partial class UsersAuthorizationContext : DbContext
{
    public UsersAuthorizationContext(DbContextOptions<UsersAuthorizationContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Users> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Users>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C71C545E1");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D105349FD769E6").IsUnique();

            entity.Property(e => e.UserId).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeletedDate).HasColumnType("datetime");
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.LastNameUser)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.NameUser)
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(e => e.PasswordHash).HasMaxLength(64);
            entity.Property(e => e.PasswordSalt).HasMaxLength(128);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
