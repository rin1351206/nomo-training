package com.rinsu.todoapp.dto.Users;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsersUpdateDto extends UsersCommonRequestDto {

    @NotNull(message = "メールアドレスは必須です")
    public String email;
}
