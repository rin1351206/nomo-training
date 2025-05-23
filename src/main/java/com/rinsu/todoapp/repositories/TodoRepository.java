package com.rinsu.todoapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rinsu.todoapp.entity.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer> {
}
