package com.rinsu.todoapp.service;
 
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rinsu.todoapp.entity.Users;
import com.rinsu.todoapp.repositories.LoginRepository;
import com.rinsu.todoapp.dto.LoginDto;

@Service
public class LoginService {
    
    @Autowired
    private LoginRepository repository;
    
    //ログイン
    public String login(LoginDto login) {
        Optional<Users> userOpt = repository.findByEmail(login.email);
        
        if (!userOpt.isPresent()) {
            return "ユーザー名またはパスワードが間違っています";
        }

        Users user = userOpt.get();
        if (!login.password.equals(user.getPassword())) {
            return "ユーザー名またはパスワードが間違っています";
        }

        user.setLastLoginAt(LocalDateTime.now());
        repository.save(user);
        
        return "ログイン成功";
    }

    //ログアウト
    public String logout(Long id) {
        Optional<Users> userOpt = repository.findById(id);
        Users user = userOpt.get();
        user.setLastLoginAt(LocalDateTime.now());
        return "ログアウト成功";
    }
}