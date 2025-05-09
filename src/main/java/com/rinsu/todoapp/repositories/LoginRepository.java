package com.rinsu.todoapp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rinsu.todoapp.entity.Users;

@Repository
public interface LoginRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUserName(String userName);

    Optional<Users> findById(Long id);
}