package com.rinsu.todoapp.service;
 
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rinsu.todoapp.entity.Users;
import com.rinsu.todoapp.repositories.UsersRepository;
import com.rinsu.todoapp.dto.Users.UsersCommonRequestDto;
import com.rinsu.todoapp.dto.Users.UsersCommonResponseDto;
import com.rinsu.todoapp.dto.Users.UsersCreateDto;

@Service
public class UsersService {
    @Autowired
    private UsersRepository repository;

    // ユーザ取得
    public UsersCommonResponseDto getUser(UsersCommonRequestDto request) {
        Users user = repository.findById(request.getId()).orElseThrow(() -> new RuntimeException("ユーザが見つかりません"));
        UsersCommonResponseDto response = new UsersCommonResponseDto();
        response.setId(user.getId());
        response.setUserName(user.getUsername());
        response.setEmail(user.getEmail());
        return response;
    }

    // ユーザ一覧取得
    public List<UsersCommonResponseDto> getUsersList() {
        return repository.findAll().stream()
        .map(user -> {
            UsersCommonResponseDto response = new UsersCommonResponseDto();
            response.setId(user.getId());
            response.setUserName(user.getUsername());
            response.setEmail(user.getEmail());
            return response;
        })
        .toList();
    }
    
    // ユーザ登録
    public UsersCommonResponseDto createUser(UsersCreateDto userInfo) {
        Users user = new Users();
        user.setUsername(userInfo.getUserName());
        user.setEmail(userInfo.getEmail());
        user.setPassword(userInfo.getPassword());
        repository.save(user);
        
        UsersCommonResponseDto response = new UsersCommonResponseDto();
        response.setId(user.getId());
        response.setUserName(user.getUsername());
        response.setEmail(user.getEmail());
        return response;
    }
}