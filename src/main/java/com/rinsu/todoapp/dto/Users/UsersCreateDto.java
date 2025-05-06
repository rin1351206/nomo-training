package com.rinsu.todoapp.dto.Users;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UsersCreateDto {

    @NotBlank(message = "ユーザ名は必須です")
    public String userName;

    @NotBlank(message = "メールアドレスは必須です")
    public String email;

    @NotBlank(message = "パスワードは必須です")
    public String password;

}