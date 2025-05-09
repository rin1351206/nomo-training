package com.rinsu.todoapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDto {
    @NotBlank(message = "ユーザー名は必須です")
    public String userName;
    
    @NotNull(message = "パスワードは必須です")
    public String password;
}