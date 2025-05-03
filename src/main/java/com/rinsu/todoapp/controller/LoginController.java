package com.rinsu.todoapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rinsu.todoapp.entity.Users;
import com.rinsu.todoapp.dto.LoginDto;
import com.rinsu.todoapp.dto.LogoutDto;
import com.rinsu.todoapp.service.LoginService;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService service;
    
    @PostMapping("/login")
    public String login(@RequestBody LoginDto request) {
        return service.login(request);
    }

    @PostMapping("/logout")
    public String logout(@RequestBody LogoutDto request) {
        return service.logout(request.id);
    }
}
