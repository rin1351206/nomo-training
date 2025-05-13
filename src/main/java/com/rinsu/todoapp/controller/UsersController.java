package com.rinsu.todoapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rinsu.todoapp.dto.Users.UsersCommonRequestDto;
import com.rinsu.todoapp.dto.Users.UsersCommonResponseDto;
import com.rinsu.todoapp.dto.Users.UsersCreateDto;
import com.rinsu.todoapp.dto.Users.UsersUpdateDto;
import com.rinsu.todoapp.dto.Users.UsersUpdatePasswordDto;
import com.rinsu.todoapp.service.UsersService;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersService service;

    // ユーザ取得
    @GetMapping("/get")
    public UsersCommonResponseDto getUser(@RequestBody UsersCommonRequestDto request) {
        return service.getUser(request);
    }

    //ユーザ一覧取得
    @GetMapping("/list")
    public List<UsersCommonResponseDto> getUsersList() {
        return service.getUsersList();
    }

    // ユーザ登録
    @PostMapping("/create")
    public UsersCommonResponseDto createUser(@RequestBody UsersCreateDto request) {
        return service.createUser(request);
    }

    // ユーザ更新
    @PostMapping("/update")
    public void updateUser(@RequestBody UsersUpdateDto request) {
        service.updateUser(request);
    }

    // ユーザ削除
    @PostMapping("/delete")
    public void deleteUser(@RequestBody UsersCommonRequestDto request) {
        service.deleteUser(request);
    }

    // パスワードを更新
    @PostMapping("/updatePassword")
    public void updatePassword(@RequestBody UsersUpdatePasswordDto request) {
        service.updatePassword(request);
    }

}