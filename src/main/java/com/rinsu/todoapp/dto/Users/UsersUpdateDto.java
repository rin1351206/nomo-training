package com.rinsu.todoapp.dto.Users;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsersUpdateDto {

    @NotNull(message = "ユーザIDは必須です")
    public Long id;
    
    
}
