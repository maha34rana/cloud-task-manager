
package com.example.cloudtask.repository;

import com.example.cloudtask.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
