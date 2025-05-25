package com.rinsu.todoapp.dto.Users;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import com.rinsu.todoapp.entity.Users;

@Data
public class UsersCreateDto {
    
    @NotBlank(message = "メールアドレスは必須です")
    public String email;

    @NotBlank(message = "パスワードは必須です")
    public String password;

    public Users.Gender gender;

    public Double heightCm;

    public Double weightKg;

    public String bodyType;

}