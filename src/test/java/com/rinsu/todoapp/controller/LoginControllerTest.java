package com.rinsu.todoapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rinsu.todoapp.dto.LoginDto;
import com.rinsu.todoapp.dto.LoginResponseDto;
import com.rinsu.todoapp.service.LoginService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LoginController.class)
public class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private LoginService service;

    @Test
    void LoginSuccess() throws Exception {
        LoginDto request = new LoginDto();
        request.setUserName("testuser");
        request.setPassword("testpass");

        LoginResponseDto response = new LoginResponseDto(true, "ログイン成功");
        when(service.login(request)).thenReturn(response);

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("ログイン成功"));
    }

    @Test
    void LoginFailure() throws Exception {
        LoginDto request = new LoginDto();
        request.setUserName("wronguser");
        request.setPassword("wrongpass");

        when(service.login(request)).thenThrow(new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        mockMvc.perform(post("/api/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void LogoutSuccess() throws Exception {
        LoginResponseDto response = new LoginResponseDto(true, "ログアウト成功");
        when(service.logout()).thenReturn(response);

        mockMvc.perform(post("/api/logout"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("ログアウト成功"));
    }
}
