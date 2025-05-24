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
import com.rinsu.todoapp.dto.Users.UsersUpdateDto;
import com.rinsu.todoapp.dto.Users.UsersUpdatePasswordDto;

@Service
public class UsersService {
    @Autowired
    private UsersRepository repository;

    // ユーザ取得
    public UsersCommonResponseDto getUser(UsersCommonRequestDto request) {
        Users user = repository.findById(request.getId()).orElseThrow(() -> new RuntimeException("ユーザが見つかりません"));
        UsersCommonResponseDto response = new UsersCommonResponseDto();
        response.setId(user.getId());
        response.setUserName(user.getUserName());
        response.setEmail(user.getEmail());
        return response;
    }

    // ユーザ一覧取得
    public List<UsersCommonResponseDto> getUsersList() {
        return repository.findAll().stream()
        .map(user -> {
            UsersCommonResponseDto response = new UsersCommonResponseDto();
            response.setId(user.getId());
            response.setUserName(user.getUserName());
            response.setEmail(user.getEmail());
            return response;
        })
        .toList();
    }
    
    // ユーザ登録
    public UsersCommonResponseDto createUser(UsersCreateDto userInfo) {
        Users user = new Users();
        user.setUserName(userInfo.getEmail());
        user.setEmail(userInfo.getEmail());
        user.setPassword(userInfo.getPassword());
        user.setGender(userInfo.getGender());
        user.setHeightCm(userInfo.getHeightCm());
        user.setWeightKg(userInfo.getWeightKg());
        user.setBodyType(Users.BodyType.valueOf(userInfo.getBodyType()));
        repository.save(user);
        
        UsersCommonResponseDto response = new UsersCommonResponseDto();
        response.setId(user.getId());
        response.setUserName(user.getUserName());
        response.setEmail(user.getEmail());
        return response;
    }

    // ユーザ更新
    public UsersCommonResponseDto updateUser(UsersUpdateDto userInfo) {
        Users user = repository.findById(userInfo.getId()).orElseThrow(() -> new RuntimeException("ユーザが見つかりません"));
        user.setEmail(userInfo.getEmail());
        repository.save(user);

        UsersCommonResponseDto response = new UsersCommonResponseDto();
        response.setId(user.getId());
        response.setUserName(user.getUserName());
        response.setEmail(user.getEmail());
        return response;
    }

    // ユーザ削除
    public UsersCommonResponseDto deleteUser(UsersCommonRequestDto userInfo) {
        Optional<Users> userOpt = repository.findById(userInfo.getId());
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            repository.delete(user);
        }
        UsersCommonResponseDto response = new UsersCommonResponseDto();
        return response;
    }

    // パスワード更新
    public UsersCommonResponseDto updatePassword(UsersUpdatePasswordDto userInfo) {
        Users user = repository.findById(userInfo.getId()).orElseThrow(() -> new RuntimeException("ユーザが見つかりません"));
        user.setPassword(userInfo.getPassword());
        repository.save(user);
        
        UsersCommonResponseDto response = new UsersCommonResponseDto();
        response.setId(user.getId());
        response.setUserName(user.getUserName());
        response.setEmail(user.getEmail());
        return response;
    }
}