// Select the form elements
const taskNameInput = document.getElementById('taskName');
const taskCategoryInput = document.getElementById('taskCategory');
const taskDeadlineInput = document.getElementById('taskDeadline');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasks');
const categoryFilter = document.getElementById('categoryFilter');

// Task array to hold tasks
let tasks = [];

// Function to add a task
function addTask() {
    const taskName = taskNameInput.value.trim();
    const taskCategory = taskCategoryInput.value.trim();
    const taskDeadline = taskDeadlineInput.value;

    if (!taskName || !taskCategory || !taskDeadline) {
        alert('Please fill in all fields');
        return;
    }

    if (new Date(taskDeadline) < new Date()) {
        alert('Deadline must be in the future');
        return;
    }

    const newTask = {
        id: Date.now(),
        name: taskName,
        category: taskCategory,
        deadline: taskDeadline,
        completed: false
    };

    tasks.push(newTask);
    updateCategoryFilter();
    renderTasks();
    clearForm();
}

// Function to render tasks
function renderTasks() {
    tasksList.innerHTML = ''; // Clear the list

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <span>${task.name} (Deadline: ${task.deadline}, Category: ${task.category})</span>
            <div>
                <button class="complete-btn" data-id="${task.id}">
                    ${task.completed ? 'Unmark' : 'Mark Complete'}
                </button>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            </div>
        `;
        tasksList.appendChild(taskItem);
    });
}

// Function to toggle task completion
function toggleComplete(taskId) {
    tasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    updateCategoryFilter();
    renderTasks();
}

// Function to clear the form
function clearForm() {
    taskNameInput.value = '';
    taskCategoryInput.value = '';
    taskDeadlineInput.value = '';
}

// Function to update category filter
function updateCategoryFilter() {
    const uniqueCategories = ['all', ...new Set(tasks.map(task => task.category))];
    categoryFilter.innerHTML = uniqueCategories.map(category =>
        `<option value="${category}">${category}</option>`
    ).join('');
}

// Event listener for add task button
addTaskBtn.addEventListener('click', addTask);

// Event delegation for task actions
tasksList.addEventListener('click', event => {
    const taskId = parseInt(event.target.dataset.id, 10);
    if (event.target.classList.contains('complete-btn')) {
        toggleComplete(taskId);
    } else if (event.target.classList.contains('delete-btn')) {
        deleteTask(taskId);
    }
});

// Initial setup
renderTasks();
updateCategoryFilter();
