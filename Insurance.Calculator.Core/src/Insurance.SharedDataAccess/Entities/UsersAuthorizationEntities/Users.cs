using System;
using System.Collections.Generic;

namespace Insurance.SharedDataAccess.Entities.UsersAuthorizationEntities;

public partial class Users
{
    public int UserId { get; set; }

    public string NameUser { get; set; }

    public string LastNameUser { get; set; }

    public string Email { get; set; }

    public byte[] PasswordHash { get; set; }

    public byte[] PasswordSalt { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public DateTime? DeletedDate { get; set; }
}
