package com.rinsu.todoapp.dto.Users;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsersUpdatePasswordDto extends UsersCommonRequestDto {

    @NotNull(message = "パスワードは必須です")
    public String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
