package com.rinsu.todoapp.dto.Users;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UsersCreateDto {
    
    @NotBlank(message = "メールアドレスは必須です")
    public String email;

    @NotBlank(message = "パスワードは必須です")
    public String password;

    public String gender;

    public Double heightCm;

    public Double weightKg;

    public String bodyType;

}