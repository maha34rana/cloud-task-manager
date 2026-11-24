
package com.example.cloudtask.service;

import com.example.cloudtask.model.Task;
import com.example.cloudtask.repository.TaskRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @Test
    void shouldCreateTask() {

        Task task = new Task(
                "Learn Java",
                "Complete Spring Boot"
        );

        when(taskRepository.save(task)).thenReturn(task);

        Task result = taskService.createTask(task);

        assertEquals("Learn Java", result.getTitle());

        verify(taskRepository).save(task);
    }

    @Test
    void shouldGetAllTasks() {

        List<Task> tasks = List.of(
                new Task("Learn Java", "Complete Java"),
                new Task("Learn Docker", "Practice Docker")
        );

        when(taskRepository.findAll()).thenReturn(tasks);

        List<Task> result = taskService.getAllTasks();

        assertEquals(2, result.size());

        verify(taskRepository).findAll();
    }
}
