package com.rinsu.todoapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.rinsu.todoapp.service.TodoService;

@Controller
public class HomeController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("todos", todoService.getTodoList());
        return "index";
    }
} 