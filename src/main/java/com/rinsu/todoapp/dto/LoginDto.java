package com.rinsu.todoapp.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDto {
    @NotBlank(message = "メールは必須です")
    public String email;
    
    @NotNull(message = "パスワードは必須です")
    public String password;
}