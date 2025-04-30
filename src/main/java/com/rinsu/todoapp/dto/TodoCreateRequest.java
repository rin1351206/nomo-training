package com.rinsu.todoapp.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TodoCreateRequest {
    @NotBlank(message = "タイトルは必須です")
    private String title;
    
    @NotNull(message = "期限は必須です")
    private LocalDate deadline;
} 