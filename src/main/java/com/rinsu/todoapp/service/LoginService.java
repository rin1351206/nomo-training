package com.rinsu.todoapp.service;
 
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.rinsu.todoapp.dto.LoginDto;
import com.rinsu.todoapp.dto.LoginResponseDto;
import com.rinsu.todoapp.entity.Users;
import com.rinsu.todoapp.repositories.LoginRepository;

@Service
public class LoginService {
    
    @Autowired
    private LoginRepository repository;
    
    //ログイン
    public LoginResponseDto login(LoginDto login) {
        Optional<Users> userOpt = repository.findByUserName(login.userName);
        
        if (!userOpt.isPresent()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "ユーザー名またはパスワードが間違っています");
        }

        Users user = userOpt.get();
        if (!login.password.equals(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "ユーザー名またはパスワードが間違っています");
        }

        user.setLastLoginAt(LocalDateTime.now());
        repository.save(user);
        
        return new LoginResponseDto(true, "ログイン成功");
    }

    //ログアウト
    public LoginResponseDto logout() {
        return new LoginResponseDto(true, "ログアウト成功");
    }
}