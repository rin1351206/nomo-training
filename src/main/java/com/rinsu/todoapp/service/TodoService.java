package com.rinsu.todoapp.service;
 
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rinsu.todoapp.entity.Todo;
import com.rinsu.todoapp.repositories.TodoRepository;

@Service
public class TodoService {
	
	@Autowired
	private TodoRepository repository;
	
	public List<Todo> getTodoList() {
		return repository.findAll();
	}
	
	public List<Todo> addTodo(String title, LocalDate deadline) {
		Todo todo = new Todo();
		todo.setTitle(title);
		todo.setDeadline(deadline);
		todo.setCreatedAt(LocalDateTime.now());
		todo.setUpdatedAt(LocalDateTime.now());
		todo.setDeleteFlg(0);
		repository.save(todo);
		return repository.findAll();
	}
	
	public void deleteTodo(int id) {
		repository.deleteById(id);
	}
    
}
