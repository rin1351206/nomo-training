package com.rinsu.todoapp.dto.Users;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsersDeleteDto {

    @NotNull(message = "ユーザIDは必須です")
    public Long id;
}