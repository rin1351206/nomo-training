package com.rinsu.todoapp.dto.Users;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsersCommonResponseDto {

    @NotNull(message = "ユーザIDは必須です")
    public Long id;

    @NotBlank(message = "ユーザ名は必須です")
    public String userName;

    @NotBlank(message = "メールアドレスは必須です")
    public String email;
}