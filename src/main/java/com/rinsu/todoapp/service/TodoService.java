package com.rinsu.todoapp.service;
 
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
		todo.setStatus(1);
		repository.save(todo);
		return repository.findAll();
	}
	
	public void deleteTodo(int id) {
		Optional<Todo> todoOpt = repository.findById(id);
		if (todoOpt.isPresent()) {
			Todo todo = todoOpt.get();
			todo.setDeleteFlg(1);
			repository.save(todo);
		}
	}
    
}
