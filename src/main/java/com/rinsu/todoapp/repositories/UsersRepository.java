package com.rinsu.todoapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rinsu.todoapp.entity.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
}
